// Google Analytics event tracking utility

type GTagEvent = {
    action: string;
    category: string;
    label?: string;
    value?: number;
};

// Extend Window interface for gtag
declare global {
    interface Window {
        gtag: (
            command: "event" | "config" | "js",
            targetId: string,
            config?: Record<string, unknown>
        ) => void;
    }
}

/**
 * Track a custom event in Google Analytics
 * @param action - The action name (e.g., "cta_click")
 * @param category - Event category (e.g., "engagement")
 * @param label - Optional label for more context (e.g., "hero_section")
 * @param value - Optional numeric value
 */
export const trackEvent = ({
    action,
    category,
    label,
    value,
}: GTagEvent): void => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

/**
 * Track CTA button clicks
 * @param location - Where the CTA is located (e.g., "header", "hero", "footer")
 */
export const trackCTAClick = (location: string): void => {
    trackEvent({
        action: "cta_click",
        category: "engagement",
        label: location,
    });
};
