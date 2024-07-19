import './footer.css'

export const Footer = () => {
  return (
    <div className='footerContainer'>
      <div className="copyright">
        <span className="copyrightInfo">Copyright © 2024 LUXELI</span>
      </div>
      <div className="otherInfo">
        <span className="otherInforLog">Help Center</span>
        <hr />
        <span className="otherInforLog">Operations</span>
        <hr />
        <span className="otherInforLog">Terms</span>
        <hr />
        <span className="otherInforLog">Privacy Policy</span>
      </div>
    </div>
  )
}

export default Footer;