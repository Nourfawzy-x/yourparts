export default function EditTopicForm() {
  return (
    <form className="my-5">
      <div className="mt-4">
        <label
          htmlFor="email"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Topic Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="topic title"
            id="topic title"
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="topic description"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Topic Description
        </label>
        <div className="mt-2">
          <textarea
            id="topic description"
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="you@example.com"
          ></textarea>
        </div>
      </div>
      <div className="my-3">
        <button
          type="button"
          className="btn mx-2 bg-yellow-500 rounded-md px-6 text-center py-3 font-bold text-white shadow-sm hover:bg-white hover:outline-yellow-500 hover:text-yellow-500 hover:outline transition-transform  "
        >
          Edit Topic
        </button>
      </div>
    </form>
  );
}
