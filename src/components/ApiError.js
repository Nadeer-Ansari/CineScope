import React from 'react';
import { FaShieldAlt, FaWifi, FaSync, FaHome } from 'react-icons/fa';

export default function ApiError({ error, onRetry, onGoHome }) {
    const getIcon = () => {
        if (error?.title?.includes("VPN")) return <FaShieldAlt size={60} />;
        if (error?.title?.includes("Network")) return <FaWifi size={60} />;
        return <span style={{ fontSize: "4rem" }}>🌐</span>;
    };

    return (
        <div className="container" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{
                background: "var(--bg-card)",
                borderRadius: "20px",
                padding: "2rem",
                maxWidth: "650px",
                margin: "0 auto",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow)",
                textAlign: "center"
            }}>
                <div style={{ color: "#e50914", marginBottom: "1rem" }}>
                    {getIcon()}
                </div>

                <h2 style={{ color: "#e50914", marginBottom: "1rem", fontSize: "1.8rem" }}>
                    {error?.title || "Connection Issue"}
                </h2>

                <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: "1.6", fontSize: "1rem" }}>
                    {error?.message || "Unable to connect to the movie database. This service may be restricted in your region."}
                </p>

                <div style={{
                    background: "rgba(229, 9, 20, 0.1)",
                    padding: "1.5rem",
                    borderRadius: "12px",
                    marginBottom: "1.5rem",
                    textAlign: "left"
                }}>
                    <h4 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#e50914", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span>💡</span> Troubleshooting Tips for Indian Users:
                    </h4>
                    <ul style={{ color: "var(--text-secondary)", fontSize: "0.95rem", paddingLeft: "1.5rem", margin: 0 }}>
                        <li style={{ marginBottom: "0.5rem" }}>🔹 <strong>Jio/Airtel/Vi Users:</strong> TMDB API is often blocked on these networks</li>
                        <li style={{ marginBottom: "0.5rem" }}>🔹 <strong>Solution:</strong> Use a VPN (Cloudflare WARP, ProtonVPN, or any free VPN)</li>
                        <li style={{ marginBottom: "0.5rem" }}>🔹 Switch to mobile data if on WiFi, or vice versa</li>
                        <li style={{ marginBottom: "0.5rem" }}>🔹 Try using Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1)</li>
                        <li style={{ marginBottom: "0.5rem" }}>🔹 Disable any VPN if already connected and try reconnecting</li>
                    </ul>
                </div>

                <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <button
                        onClick={onRetry}
                        className="btn-movie"
                        style={{
                            width: "auto",
                            padding: "0.75rem 1.5rem",
                            background: "#e50914",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        }}
                    >
                        <FaSync /> Retry Connection
                    </button>
                    <button
                        onClick={onGoHome}
                        className="btn-movie"
                        style={{
                            width: "auto",
                            padding: "0.75rem 1.5rem",
                            background: "#666",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        }}
                    >
                        <FaHome /> Go Back Home
                    </button>
                </div>

                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "1.5rem" }}>
                    Note: CineStack requires access to TMDB API. Some ISPs block this service.
                    Using a VPN resolves this issue.
                </p>
            </div>
        </div>
    );
}