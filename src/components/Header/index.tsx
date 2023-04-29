import logo from '/logo.svg';
import metadata from '../../config/metadata';

const Header = () => {
  return (
    <>
      <header className='body-font text-gray-600'>
        <div className='container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row'>
          <a
            className='title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0'
            href={metadata.website}
            target='_blank'
          >
            <img
              src={logo}
              className='h-10'
            />
            <span className='ml-3 text-xl'>Open-Lineage</span>
          </a>
          <nav className='flex flex-wrap items-center justify-center text-base md:ml-4	md:mr-auto md:border-l md:border-gray-400 md:py-1 md:pl-4'>
            {metadata.navLinks.map((item) => {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target='_blank'
                  className='mr-5 hover:text-gray-900'
                >
                  {item.title}
                </a>
              );
            })}
          </nav>
          <a
            href={metadata.github}
            target='_blank'
            rel='noopener'
            aria-label='OpenByteCode on Github'
            className='hover:text-primary dark:text-primary-dark mr-3'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1.6em'
              height='1.6em'
              viewBox='0 -2 24 24'
              fill='currentColor'
            >
              <path d='M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0'></path>
            </svg>
          </a>
          <a
            href={metadata.website}
            className='mt-4 inline-flex items-center rounded border-0 bg-gray-100 px-3 py-1 text-base hover:bg-gray-200 focus:outline-none md:mt-0'
          >
            官网
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='ml-1 h-4 w-4'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
