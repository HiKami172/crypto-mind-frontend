import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from '@mui/material/styles';

const TradingViewWidget: React.FC = () => {
    const theme = useTheme(); // Get the theme object
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!container.current) return;

        // Store the container reference in a local variable to use in cleanup
        const currentContainer = container.current;

        // Clear existing content in the container
        currentContainer.innerHTML = '';

        // Prepare the widget's container div
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container__widget';
        widgetContainer.style.height = '100%'; // Ensure the widget container takes full height
        widgetContainer.style.width = '100%';  // Ensure the widget container takes full width
        currentContainer.appendChild(widgetContainer);

        // Add the TradingView widget script dynamically
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;

        // Configure the theme and widget settings
        const isDarkMode = theme.palette.mode === 'dark';
        const widgetConfig = {
            autosize: true,
            symbol: "BINANCE:BTCUSDT",
            interval: "1",
            timezone: "Etc/UTC",
            theme: isDarkMode ? 'dark' : 'light',
            style: "1",
            locale: "en",
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)',
            allow_symbol_change: false,
            save_image: false,
            calendar: false,
            hide_volume: true,
            support_host: "https://www.tradingview.com"
        };

        // Attach the widget configuration as the script's innerHTML
        script.innerHTML = JSON.stringify(widgetConfig);
        widgetContainer.appendChild(script);

        // Cleanup function to remove script when the component unmounts
        return () => {
            // Ensure that we only clear the contents of the correct container
            if (currentContainer) {
                currentContainer.innerHTML = '';
            }
        };
    }, [theme.palette.mode]); // Re-run only when theme mode changes

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: '100%', width: '100%' }}>
            {/* Copyright Footer */}
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noreferrer noopener nofollow" target="_blank">
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
};

export default memo(TradingViewWidget);
