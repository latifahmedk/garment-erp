import { motion } from "framer-motion";
import { COLORS } from "../utils/colors";

function StatCard({
    title,
    value,
    icon,
    color = COLORS.primary,
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.03,
                y: -5,
            }}
            transition={{ duration: 0.2 }}
            style={{
                background: COLORS.card,
                borderRadius: 18,
                border: `1px solid ${COLORS.border}`,
                padding: 20,
                boxShadow: "0 10px 25px rgba(0,0,0,.25)",
                height: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div>
                    <p
                        style={{
                            color: COLORS.textSecondary,
                            marginBottom: 8,
                            fontSize: 14,
                        }}
                    >
                        {title}
                    </p>

                    <h3
                        style={{
                            color: COLORS.text,
                            margin: 0,
                            fontWeight: "bold",
                        }}
                    >
                        {value}
                    </h3>
                </div>

                <div
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: color,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <i
                        className={`bi ${icon}`}
                        style={{
                            color: "#fff",
                            fontSize: 24,
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default StatCard;