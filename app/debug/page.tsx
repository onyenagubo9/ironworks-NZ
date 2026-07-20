import { auth } from "@/auth";

export default async function DebugPage() {
  const session = await auth();

  return (
    <div style={{ padding: 20 }}>
      <h1>Session Debug</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}