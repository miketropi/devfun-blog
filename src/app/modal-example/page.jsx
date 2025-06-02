import ModalExample from '../components/ModalExample';

export const metadata = {
  title: 'Modal Example - DevFun Blog',
  description: 'Example of a responsive modal component with dark/light mode support',
};

export default function ModalExamplePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Modal Component Example</h1>
      <p className="mb-8 text-gray-700 dark:text-gray-300">
        This page demonstrates a reusable Modal component with support for dark/light mode, 
        responsive design, and multiple size options. Click any of the buttons below to see 
        the modal in action.
      </p>
      
      <ModalExample />
    </div>
  );
}