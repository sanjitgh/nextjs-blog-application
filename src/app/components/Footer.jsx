const Footer = () => {
  return (
    <footer className='bg-gray-50 border-t border-gray-200 py-6 mt-12'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <p className='text-gray-500 text-sm'>
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
