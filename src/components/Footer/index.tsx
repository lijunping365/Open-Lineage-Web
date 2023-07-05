import metadata from '../../config/metadata';

interface FooterProps {
  nodeSize: number;
  nodeLevel: number;
}
const Footer = ({ nodeSize, nodeLevel }: FooterProps) => {
  return (
    <>
      <footer className='container body-font absolute bottom-0 bg-white z-[200]'>
        <div className='mx-auto flex flex-col items-center px-5 py-2 sm:flex-row shadow-md border-t'>
          <p className='text-sm space-x-4 font-medium'>
            <span>节点：{nodeSize}</span>
            <span>层数：{nodeLevel}</span>
          </p>
          <span className='inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start'>
            <a
              href={metadata.website}
              className='ml-1 text-gray-600 text-sm'
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
