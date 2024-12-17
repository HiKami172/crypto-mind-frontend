import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from '@mui/material/styles';

const TradingViewWidget: React.FC = () => {
    const theme = useTheme(); // Get the theme object
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (container.current) {
            // Ensure the container is ready and empty before adding the widget
            container.current.innerHTML = '';

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

            // Serialize the widget configuration and add it to the script
            script.innerHTML = JSON.stringify(widgetConfig);

            // Wait for the DOM to be fully loaded before appending the script
            const timer = setTimeout(() => {
                if (container.current) {
                    container.current.appendChild(script);
                    clearTimeout(timer);  // Clear timeout once the script is appended
                }
            }, 0);  // Ensure script is appended after the DOM is fully ready
        }
    }, [theme.palette.mode]); // Re-run only when theme mode changes

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: '100%', width: '100%' }}>
            <div className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noreferrer noopener nofollow" target="_blank">
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
};

export default memo(TradingViewWidget);
