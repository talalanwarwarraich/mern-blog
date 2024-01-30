import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Logo from './ui/Logo';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;

  const SignInButton = () => {
    return (
      <Link to='sign-in'>
        <Button gradientDuoTone='purpleToBlue' outline>
          Sign In
        </Button>
      </Link>
    );
  };

  const ProfileDropdown = () => {
    return (
      <Dropdown
        arrowIcon={false}
        inline
        label={<Avatar alt='user' img={currentUser?.profilePic} rounded />}
      >
        <Dropdown.Header>
          <span className='block text-sm'>@{currentUser?.username}</span>
          <span className='block text-sm font-medium truncate'>
            {currentUser?.email}
          </span>
        </Dropdown.Header>
        <Link to={'/dashboard?tab=profile'}>
          <Dropdown.Item>Profile</Dropdown.Item>
        </Link>
        <Dropdown.Divider />
        <Dropdown.Item>Sign Out</Dropdown.Item>
      </Dropdown>
    );
  };
  return (
    <Navbar className='border-b-2'>
      <Logo />
      <form>
        <TextInput
          type='text'
          placeholder='search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        {currentUser ? <ProfileDropdown /> : <SignInButton />}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
