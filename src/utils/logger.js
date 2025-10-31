const isProd = import.meta.env?.MODE === "production" ;

export function logError(message, error) {
    if (!isProd)
        console.error(`[ERROR] ${message}`, error);
    else 
        console.error(`[ERROR] ${message}`);
    }

    export function logInfo(message, data) {
    if (!isProd)
        console.log(`[INFO] ${message}`, data || "");
}
