import { LoginButton } from '../components/LoginModal';

export const metadata = {
  title: 'Login Example - DevFun Blog',
  description: 'Example of a login modal component with form integration',
};

export default function LoginExamplePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Login Modal Example</h1>
      <p className="mb-8 text-gray-700 dark:text-gray-300">
        This page demonstrates the LoginModal component which integrates the Modal and LoginForm components.
        Click the button below to open the login modal.
      </p>
      
      <div className="space-y-6">
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Default Login Button</h2>
          <p className="mb-4">This is the default login button with standard styling:</p>
          <LoginButton />
        </div>
        
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Custom Login Button</h2>
          <p className="mb-4">You can customize the button text and styling:</p>
          <LoginButton className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
            Sign In / Create Account
          </LoginButton>
        </div>
      </div>
    </div>
  );
}