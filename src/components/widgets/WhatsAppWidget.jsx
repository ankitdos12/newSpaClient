import { useEffect } from 'react';

const WhatsAppWidget = () => {
    useEffect(() => {
        // Inject the script
        (function (w, d, s, o, f, js, fjs) {
            w[o] = w[o] || function () {
                (w[o].q = w[o].q || []).push(arguments);
            };
            js = d.createElement(s);
            fjs = d.getElementsByTagName(s)[0];
            js.id = o;
            js.src = f;
            js.async = 1;
            fjs.parentNode.insertBefore(js, fjs);
        })(window, document, "script", "dt", "https://d3r49s2alut4u1.cloudfront.net/js/widget.js");

        // Initialize the widget with custom styling
        window.dt("init", {
            crmWidgetId: "94d68efd-c6d3-4269-8ea0-7318674d4a86",
            companyName: "SPA ADVISOR",
            companyLogoUrl: "",
            phoneNumber: "917506359139",
            widgetStyle: {
                buttonWidth: "80px",         // Increased button size
                buttonHeight: "80px",        // Increased button size
                bubbleWidth: "360px",        // Increased bubble width
                bubbleHeight: "440px",       // Increased bubble height
                buttonIconSize: "32px",      // Increased icon size
                fontSize: "16px"             // Increased font size
            }
        });

        // Add custom CSS to override default styles
        const customStyles = document.createElement('style');
        customStyles.textContent = `
            .dt-widget-button {
                transform: scale(1.2) !important;
            }
            .dt-widget-bubble {
                min-width: 360px !important;
                min-height: 440px !important;
            }
        `;
        document.head.appendChild(customStyles);

        // Cleanup
        return () => {
            // Remove the script tag on component unmount
            const scriptTag = document.getElementById('dt');
            if (scriptTag) {
                scriptTag.remove();
            }
            document.head.removeChild(customStyles);
        };
    }, []);

    return null;
};

export default WhatsAppWidget;
