import { motion } from "framer-motion";
import { COLORS } from "../utils/colors";

function Button({

    text,

    icon,

    onClick,

}) {

    return (

        <motion.button

            whileHover={{

                scale: 1.04,

            }}

            whileTap={{

                scale: .95,

            }}

            onClick={onClick}

            style={{

                background: COLORS.primary,

                color: "white",

                border: "none",

                borderRadius: 12,

                padding: "12px 22px",

                fontWeight: "bold",

            }}

        >

            <i

                className={`bi ${icon}`}

                style={{

                    marginRight: 8,

                }}

            />

            {text}

        </motion.button>

    );

}

export default Button;