import footerImg from '../../../assets/images/footer1.png'

const Footer = () => {
    return (
        <div className='relative'>
            <img src={footerImg} className='w-full h-[850px] md:h-[450px] object-cover lg:object-fill lg:h-80' alt="" />
            <footer className='flex flex-col w-full absolute p-5 md:p-10 bg-transparent text-white  bottom-0 top-12'>
                <div className="footer text-lg">
                    <nav>
                        <header className="footer-title">Services</header>
                        <a className="link link-hover">Parcel Tracking</a>
                        <a className="link link-hover">Express Shipping</a>
                        <a className="link link-hover">Secure Packaging</a>
                        <a className="link link-hover">Customer Support</a>
                    </nav>
                    <nav>
                        <header className="footer-title">Company</header>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                    </nav>
                    <nav>
                        <header className="footer-title">Legal</header>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                    <form>
                        <header className="footer-title">Newsletter</header>
                        <fieldset className="form-control w-80">
                            <label className="label">
                                <span className="label-text text-white">Enter your email address</span>
                            </label>
                            <div className="join">
                                <input type="text" placeholder="username@site.com" className="input input-bordered join-item" />
                                <button className="btn bg-orange-600 text-white join-item">Subscribe</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div className="text-center mt-5">
                    <aside>
                        <p>Copyright © 2023 -Parcel Point</p>
                    </aside>
                </div>
            </footer>
        </div>
    );
};

export default Footer;