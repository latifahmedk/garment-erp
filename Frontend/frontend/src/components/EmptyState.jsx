import { COLORS } from "../utils/colors";

function EmptyState({

    title,

}) {

    return (

        <div

            style={{

                textAlign: "center",

                padding: 60,

                color: COLORS.textSecondary,

            }}

        >

            <i

                className="bi bi-inbox"

                style={{

                    fontSize: 70,

                }}

            />

            <h5

                style={{

                    marginTop: 20,

                }}

            >

                {title}

            </h5>

        </div>

    );

}

export default EmptyState;