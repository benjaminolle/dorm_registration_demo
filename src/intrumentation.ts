// instrumentation.ts

export async function register() {
    // Ensure this code only executes on the standard Node.js server environment,
    // preventing it from throwing errors if an Edge Runtime container boots up.
    if (process.env.NEXT_RUNTIME === 'nodejs') {

        // We use a dynamic import here to ensure that your server-only code/database drivers 
        // are only compiled and required on the Node.js backend runtime.
        const { initDb } = await import('@/lib/db');

        try {
            await initDb();
            console.log('🚀 Database tables validated successfully at server boot.');
        } catch (error) {
            console.error('🚨 Database validation failed at startup:', error);
        }
    }
}
