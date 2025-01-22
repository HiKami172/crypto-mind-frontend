import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from '@mui/material/styles';

const TradingViewWidget: React.FC = () => {
    const theme = useTheme(); // Get the theme object
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!container.current) return;

        const currentContainer = container.current;

        currentContainer.innerHTML = '';

        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container__widget';
        widgetContainer.style.height = '100%';
        widgetContainer.style.width = '100%';
        currentContainer.appendChild(widgetContainer);

        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;

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

        script.innerHTML = JSON.stringify(widgetConfig);
        widgetContainer.appendChild(script);

        return () => {
            if (currentContainer) {
                currentContainer.innerHTML = '';
            }
        };
    }, [theme.palette.mode]);

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
