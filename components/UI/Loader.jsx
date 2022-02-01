
/**
 * @param {string} className 
 */
export function Loader({ className, size = 16, borderWidth = 3 }) {
    className += ' loader spinner-border animate-spin'

    
    return (
        <div className={className} role="status" style={{ width: `${size}px`, height: `${size}px`, borderWidth: `${borderWidth}px` }}>
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}
