import { motion } from "framer-motion";
import { COLORS } from "../utils/colors";

function Card({ children }) {

    return (

        <motion.div

            initial={{ opacity: 0, y: 15 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .4 }}

            style={{

                background: COLORS.card,

                borderRadius: 18,

                padding: 25,

                border: `1px solid ${COLORS.border}`,

                boxShadow: "0 10px 25px rgba(0,0,0,.25)",

            }}

        >

            {children}

        </motion.div>

    );

}

export default Card;