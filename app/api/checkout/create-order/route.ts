import { NextRequest, NextResponse } from "next/server";

import { Prisma } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest
) {
  try {
    //----------------------------------------------------
    // Authentication
    //----------------------------------------------------

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Please sign in.",
        },
        {
          status: 401,
        }
      );
    }

    //----------------------------------------------------
    // Request Body
    //----------------------------------------------------

    const { checkout } =
      await request.json();

    if (!checkout) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Checkout information is missing.",
        },
        {
          status: 400,
        }
      );
    }

    //----------------------------------------------------
    // Validate Bank
    //----------------------------------------------------

    const bank =
      await prisma.bankAccount.findFirst({
        where: {
          id: checkout.selectedBankId,
          isActive: true,
        },
      });

    if (!bank) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Selected bank account does not exist.",
        },
        {
          status: 400,
        }
      );
    }

    //----------------------------------------------------
    // Load Customer Cart
    //----------------------------------------------------

    const cart =
      await prisma.cart.findUnique({
        where: {
          userId: session.user.id,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  inventory: true,
                  images: {
                    orderBy: {
                      isCover: "desc",
                    },
                    take: 1,
                  },
                },
              },

              variant: true,
            },
          },
        },
      });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          error: "Cart not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (cart.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your cart is empty.",
        },
        {
          status: 400,
        }
      );
    }

    //----------------------------------------------------
    // Validate Inventory
    //----------------------------------------------------

    for (const item of cart.items) {
      const inventory =
        item.product.inventory;

      if (!inventory) {
        return NextResponse.json(
          {
            success: false,
            error: `${item.product.name} has no inventory record.`,
          },
          {
            status: 400,
          }
        );
      }

      if (
        inventory.trackStock &&
        inventory.quantity <
          item.quantity
      ) {
        return NextResponse.json(
          {
            success: false,
            error: `Only ${inventory.quantity} unit(s) of ${item.product.name} remain in stock.`,
          },
          {
            status: 400,
          }
        );
      }
    }

    //----------------------------------------------------
    // Coupon Validation
    //----------------------------------------------------
   let coupon = null;

    if (checkout.couponId) {
      coupon =
        await prisma.coupon.findUnique({
          where: {
            id: checkout.couponId,
          },
          select: {
            id: true,
            type: true,
            value: true,
            isActive: true,
            startsAt: true,
            expiresAt: true,
            usageLimit: true,
            usedCount: true,
          },
        });

      if (!coupon) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Coupon no longer exists.",
          },
          {
            status: 400,
          }
        );
      }

      if (!coupon.isActive) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Coupon is inactive.",
          },
          {
            status: 400,
          }
        );
      }

      const now = new Date();

      if (
        coupon.startsAt &&
        coupon.startsAt > now
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Coupon has not started yet.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        coupon.expiresAt &&
        coupon.expiresAt < now
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Coupon has expired.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        coupon.usageLimit !== null &&
        coupon.usedCount >=
          coupon.usageLimit
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Coupon usage limit reached.",
          },
          {
            status: 400,
          }
        );
      }
    }

    //----------------------------------------------------
    // Calculate Totals
    //----------------------------------------------------

    let subtotal = 0;

    for (const item of cart.items) {
      subtotal +=
        Number(item.product.price) *
        item.quantity;
    }

    const shipping =
      Number(
        checkout.shippingFee ?? 0
      );

    const tax = Number(
      checkout.tax ?? 0
    );

    let discount = 0;

    if (coupon) {
      if (
        coupon.type ===
        "PERCENTAGE"
      ) {
        discount =
          subtotal *
          (coupon.value / 100);
      } else {
        discount = coupon.value;
      }

      if (discount > subtotal) {
        discount = subtotal;
      }
    }

    const total =
      subtotal +
      shipping +
      tax -
      discount;

    //----------------------------------------------------
    // Generate Order Number
    //----------------------------------------------------

    const orderNumber = `NZ-${Date.now()}`;

    //----------------------------------------------------
    // Begin Transaction
    //----------------------------------------------------

    const result =
      await prisma.$transaction(
        async (tx) => {

                  //----------------------------------------------------
      // Create Order
      //----------------------------------------------------

      const order = await tx.order.create({
        data: {
          orderNumber,

          customerId: session.user.id,

          status: "PENDING",

          paymentStatus: "PENDING",

          paymentMethod: "BANK_TRANSFER",

          subtotal: new Prisma.Decimal(
            subtotal
          ),

          discount: new Prisma.Decimal(
            discount
          ),

          shippingCost:
            new Prisma.Decimal(
              shipping
            ),

          tax: new Prisma.Decimal(
            tax
          ),

          total: new Prisma.Decimal(
            total
          ),

          // Shipping Address

          shippingFirstName:
            checkout.shippingAddress
              .firstName,

          shippingLastName:
            checkout.shippingAddress
              .lastName,

          shippingCompany:
            checkout.shippingAddress
              .company || null,

          shippingPhone:
            checkout.shippingAddress
              .phone,

          shippingCountry:
            checkout.shippingAddress
              .country,

          shippingState:
            checkout.shippingAddress
              .state,

          shippingCity:
            checkout.shippingAddress
              .city,

          shippingSuburb:
            checkout.shippingAddress
              .suburb || null,

          shippingAddress1:
            checkout.shippingAddress
              .address1,

          shippingAddress2:
            checkout.shippingAddress
              .address2 || null,

          shippingPostalCode:
            checkout.shippingAddress
              .postalCode,

          // Billing Address

          billingFirstName:
            checkout.sameAsShipping
              ? checkout
                  .shippingAddress
                  .firstName
              : checkout
                  .billingAddress
                  .firstName,

          billingLastName:
            checkout.sameAsShipping
              ? checkout
                  .shippingAddress
                  .lastName
              : checkout
                  .billingAddress
                  .lastName,

          billingCompany:
            checkout.sameAsShipping
              ? checkout
                  .shippingAddress
                  .company || null
              : checkout
                  .billingAddress
                  .company || null,

          billingPhone:
            checkout.sameAsShipping
              ? checkout
                  .shippingAddress
                  .phone
              : checkout
                  .billingAddress
                  .phone,

          billingCountry:
            checkout.sameAsShipping
              ? checkout
                  .shippingAddress
                  .country
              : checkout
                  .billingAddress
                  .country,

          billingState:
            checkout.sameAsShipping
              ? checkout
                  .shippingAddress
                  .state
              : checkout
                  .billingAddress
                  .state,

          billingCity:
            checkout.sameAsShipping
              ? checkout
                  .shippingAddress
                  .city
              : checkout
                  .billingAddress
                  .city,

          billingSuburb:
            checkout.sameAsShipping
              ? checkout
                  .shippingAddress
                  .suburb || null
              : checkout
                  .billingAddress
                  .suburb || null,

          billingAddress1:
            checkout.sameAsShipping
              ? checkout
                  .shippingAddress
                  .address1
              : checkout
                  .billingAddress
                  .address1,

          billingAddress2:
            checkout.sameAsShipping
              ? checkout
                  .shippingAddress
                  .address2 || null
              : checkout
                  .billingAddress
                  .address2 || null,

          billingPostalCode:
            checkout.sameAsShipping
              ? checkout
                  .shippingAddress
                  .postalCode
              : checkout
                  .billingAddress
                  .postalCode,

          deliveryMethod:
            checkout.deliveryMethod,

          couponId:
            checkout.couponId ||
            null,

          bankAccountId:
            checkout.selectedBankId,

          notes:
            checkout.orderNotes ||
            null,
        },
      });

      //----------------------------------------------------
      // Create Order Items
      //----------------------------------------------------

      for (const item of cart.items) {
        const unitPrice =
          Number(item.product.price);

        await tx.orderItem.create({
          data: {
            orderId: order.id,

            productId:
              item.product.id,

            quantity:
              item.quantity,

            unitPrice:
              new Prisma.Decimal(
                unitPrice
              ),

            totalPrice:
              new Prisma.Decimal(
                unitPrice *
                  item.quantity
              ),

            productName:
              item.product.name,

            productSku:
              item.product.sku,

            productImage:
              item.product.images[0]
                ?.imageUrl ?? null,
          },
        });
      }

      //----------------------------------------------------
      // Create Payment
      //----------------------------------------------------

      await tx.payment.create({
        data: {
          orderId: order.id,

          method:
            "BANK_TRANSFER",

          status: "PENDING",

          amount:
            new Prisma.Decimal(
              total
            ),
        },
      });

      //----------------------------------------------------
      // Reduce Inventory
      //----------------------------------------------------

      for (const item of cart.items) {
        if (
          item.product.inventory
            ?.trackStock
        ) {
          await tx.inventory.update({
            where: {
              productId:
                item.product.id,
            },
            data: {
              quantity: {
                decrement:
                  item.quantity,
              },
            },
          });
        }
      }

      //----------------------------------------------------
      // Update Coupon Usage
      //----------------------------------------------------

      if (
        checkout.couponId
      ) {
        await tx.coupon.update({
          where: {
            id: checkout.couponId,
          },
          data: {
            usedCount: {
              increment: 1,
            },
          },
        });
      }

            //----------------------------------------------------
      // Clear Customer Cart
      //----------------------------------------------------

      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      //----------------------------------------------------
      // Return Transaction Result
      //----------------------------------------------------

      return {
        orderId: order.id,
        orderNumber: order.orderNumber,
      };
    }
  );

  //----------------------------------------------------
  // Success Response
  //----------------------------------------------------

  return NextResponse.json({
    success: true,

    message:
      "Order created successfully.",

    orderId: result.orderId,

    orderNumber: result.orderNumber,
  });
} catch (error) {
  console.error(
    "Create Order Error:",
    error
  );

  return NextResponse.json(
    {
      success: false,
      error:
        "Unable to create order. Please try again.",
    },
    {
      status: 500,
    }
  );
}
}