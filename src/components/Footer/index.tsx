import logo from '/logo.svg';
import metadata from '../../config/metadata';

const Footer = () => {
  return (
    <>
      <footer className='container body-font text-gray-600 absolute bottom-0 bg-white z-[200]'>
        <div className='mx-auto flex flex-col items-center px-5 py-2 sm:flex-row'>
          <span>节点：180</span>
          <p className='mt-4 text-sm text-gray-500 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4'>
            层数：10
          </p>
          <span className='mt-4 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start'>
            <a
              href={metadata.website}
              className='ml-1 text-gray-600'
              rel='noopener noreferrer'
              target='_blank'
            >
              {metadata.copyright}
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
