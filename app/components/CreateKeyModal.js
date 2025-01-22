export default function CreateKeyModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit({
      name: formData.get('keyName'),
      limit: formData.get('limit') || '1000'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-1">Create a new API key</h2>
          <p className="text-sm text-gray-600 mb-6">Enter a name and limit for the new API key.</p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Key Name — A unique name to identify this key
                </label>
                <input
                  type="text"
                  id="keyName"
                  name="keyName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Key Name"
                  required
                />
              </div>

              <div>
                <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">
                  Limit monthly usage*
                </label>
                <input
                  type="number"
                  id="limit"
                  name="limit"
                  defaultValue="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">
                  * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 