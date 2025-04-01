"use client";
import useTestCode from "../zustand/use-test-code";

function TestCodeInput() {
  const { testCode, setTestCode } = useTestCode();
  return (
    <div className="flex w-[14rem] items-end gap-4">
      <span className="whitespace-nowrap">Test Code:</span>
      <input
        type="text"
        onChange={(e) => setTestCode(e.target.value)}
        value={testCode}
        className="h-8 w-full border-b-2 border-gray-700 p-2 focus:border-gray-500 focus:outline-none"
      />
    </div>
  );
}
export default TestCodeInput;
