import { Footer } from 'flowbite-react';
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsYoutube,
} from 'react-icons/bs';
import Logo from './ui/Logo';

const FooterCom = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      {/* main div */}
      <div className='w-full max-w-7xl mx-auto'>
        {/* Logo and links sections */}
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          {/* logo */}
          <div className='mt-5'>
            <Logo />
          </div>
          {/* links */}
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.100jsprojects.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  100 JS Projects
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  MERN Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow US' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.github.com/talalanwarwarraich'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Privacy Policy' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        {/* divider */}
        <Footer.Divider />
        {/* copyright and icons sections */}
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          {/* copyright */}
          <Footer.Copyright
            href='#'
            by='MERN Blog'
            year={new Date().getFullYear()}
          />
          {/* icons */}
          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsYoutube} />
            <Footer.Icon href='#' icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
