function StatusBadge({

    text,

    color,

}) {

    return (

        <span

            style={{

                background: color,

                color: "white",

                padding: "5px 14px",

                borderRadius: 25,

                fontSize: 13,

            }}

        >

            {text}

        </span>

    );

}

export default StatusBadge;