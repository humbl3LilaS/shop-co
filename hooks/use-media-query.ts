import {useEffect, useState} from "react";

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(() => window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Add listener for media query changes
        mediaQueryList.addEventListener('change', handleChange);

        // Cleanup listener on unmount
        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
};