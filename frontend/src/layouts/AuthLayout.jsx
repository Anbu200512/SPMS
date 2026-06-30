import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-heading font-bold text-primary-700">
              St. Paul's
              <span className="text-accent-500"> School</span>
            </h1>
          </Link>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
