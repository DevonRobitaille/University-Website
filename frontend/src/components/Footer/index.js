import '../../utils/styles/footer.css'

export function Footer({history}) {
    return (
        <div class="footer-container-fluid">
            <div class="footer-link-box">
                <ul>
                    <li onClick={() => {
                        history.push('/@me/help');
                    }}>
                        Help Desk
                    </li>
                </ul>
            </div>
            <div class="footer-website-box">Education Portal</div>
        </div>
    )
}

export default Footer
