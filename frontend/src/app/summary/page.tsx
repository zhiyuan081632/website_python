"use client"; // This is a client component 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SimpleLayout } from '@/components/SimpleLayout';
import CopyToClipboard from 'react-copy-to-clipboard';
import { data } from 'autoprefixer';
import { ok } from 'assert';
import { saveAs } from 'file-saver'; // 导入saveAs函数


function Summary() {

  const [summaryData, setSummaryData] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  // const router = useRouter();
  // const { videoUrl } = router.query;

  useEffect(() => {

    // 定义一个异步函数来发送消息并等待回复
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify("hello"),
        });

        if (!response.ok) {
          throw new Error('网络请求失败');
        }

        const data = await response.json();
        setSummaryData(data); // 将回复数据保存到状态中
      } catch (error) {
        console.error('发生错误:', error);
      }
    };

    // 调用异步函数来发送消息
    fetchData();
  }, []); // 第二个参数是一个空数组，表示这个 effect 只会在组件挂载时运行一次

  const handleSaveToFile = () => {
    if (summaryData) {
      const currentDateTime = new Date().toISOString().replace(/[:.]/g, '').replace('T', '_').replace('Z', '');
      const fileName = `summary_${currentDateTime}.md`;
      const fileContent = `# Summary\n\n${summaryData.reply}`;
      const blob = new Blob([fileContent], { type: 'text/markdown;charset=utf-8' });
      saveAs(blob, fileName);

    }
  };

  const handleCopyToClipboard = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <SimpleLayout title="Summary for video" intro="">""
      {summaryData ? (
        <div>
          {/* <h1>Summary 页面</h1>
          <p>Video URL: {videoUrl}</p> */}
          {/* 显示回复数据，只显示 reply 字段内容 */}
          <p className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
            {summaryData.reply}
          </p>
          <div className="mt-4">
            <button onClick={handleSaveToFile} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
              保存成文件
            </button>
            <CopyToClipboard text={summaryData.reply} onCopy={handleCopyToClipboard}>
              <button className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${isCopied ? 'bg-gray-300 cursor-not-allowed' : ''}`}>
                {isCopied ? '已复制' : '复制到剪贴板'}
              </button>
            </CopyToClipboard>
          </div>
        </div>
      ) : (
        <p>加载中...</p>
      )}
    </SimpleLayout>
  );
}


export default Summary;
