import logo from '/logo.svg';
import metadata from '../../config/metadata'

const Header = () =>{
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href={metadata.website}
            target="_blank"
          >
            <img src={logo} className="h-10"/>
            <span className="ml-3 text-xl">Open-Lineage</span>
          </a>
          <nav
            className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            {metadata.navLinks.map((item) => {
              return (
                <a
                  href={item.href}
                  target="_blank"
                  className="mr-5 hover:text-gray-900">{item.title}
                </a>
              )
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
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">官网
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                 className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </header>
    </>
  )
}

export default Header;
