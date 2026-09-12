import { COLORS } from "../utils/colors";

function PageHeader({

    title,

    subtitle,

    button,

}) {

    return (

        <div

            style={{

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                marginBottom: 30,

            }}

        >

            <div>

                <h2

                    style={{

                        color: COLORS.text,

                        marginBottom: 5,

                    }}

                >

                    {title}

                </h2>

                <div

                    style={{

                        color: COLORS.textSecondary,

                    }}

                >

                    {subtitle}

                </div>

            </div>

            {button}

        </div>

    );

}

export default PageHeader;