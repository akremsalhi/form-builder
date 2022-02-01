

export default function Icon ({
    size = "16",
    name,
    fill = 'currentColor',
    ...props
}) {
    return (
        <svg className="bi" width={size} height={size} fill={fill} {...props}>
            <use xlinkHref={`/assets/images/svg/bootstrap-icons.svg#${name}`} />
        </svg>
    )
}