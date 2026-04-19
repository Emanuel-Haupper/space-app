import './Footer.css'

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <span className="footer__copy">© {new Date().getFullYear()} Space Explorer</span>
                <span className="footer__sep">·</span>
                <span className="footer__note">Data & imagery sourced from NASA</span>
                <span className="footer__sep">·</span>
                <span className="footer__note">Built with React + WebGL</span>
            </div>
        </footer>
    )
}
