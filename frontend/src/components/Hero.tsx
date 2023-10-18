"use client"; // This is a client component 
import Image from 'next/image'
import logoLaravel from '@/images/logos/laravel.svg'
import logoMirage from '@/images/logos/mirage.svg'
import logoStatamic from '@/images/logos/statamic.svg'
import logoStaticKit from '@/images/logos/statickit.svg'
import logoTransistor from '@/images/logos/transistor.svg'
import logoTuple from '@/images/logos/tuple.svg'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'
import ReactMarkdown from 'react-markdown';

interface Article {
  title: string;
  data: string;
  description: string;
}

const article1: Article = {
  title: "Title",
  data: "DATADATADATADAATA",
  description:"DESDESDESDES"
};

function Article({ article }: { article: Article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)} 
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description> 
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}



export function Hero() {

  // 创建状态变量来存储输入框的值和服务端返回的数据
  const [inputValue, setInputValue] = useState('');
  const [summaryData, setSummaryData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 定义发送请求的函数
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      setIsLoading(true);

      // 发送请求给对话服务端
      const response = await fetch('http://localhost:5000/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValue),
      });

      if (!response.ok) {
        throw new Error('网络请求失败');
      }

      // 接收并解析服务端的回复数据
      const data = await response.json();

      // 将回复数据保存到状态中，并清空输入框的值
      setSummaryData(data);
      // setInputValue('');
      article1.description=data.reply

    } catch (error) {
      console.error('发生错误:', error);
    } finally {
      setIsLoading(false);
    }
  };





  return (
    <Container className="pb-16 pt-20 text-center lg:pt-32">

      {/* Title */}
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Summary {' '}
        <span className="relative whitespace-nowrap text-blue-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">made simple</span>
        </span>{' '}
        for video views
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
      Most video platforms offer content, but overwhelm with length. We prioritize 
            concise overviews, hoping you enjoy more in less time.
      </p>

      {/* 显示输入框和按钮 */}
      <div className="space-y-10 lg:pl-16 xl:pl-24">
        <form onSubmit={handleSubmit}>
          <div className="mt-6 flex">
            <input
              type=""
              placeholder="Video URL"
              aria-label="Video URL"
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
            />
            {/* 根据加载状态设置按钮文本 */}
            <Button type="submit" className="ml-4 flex-none">
              {isLoading ? 'Loading...' : 'Summary'}
            </Button>
          </div>
       </form> 

      {/* LOGO */}
      <div className="mt-36 lg:mt-44">
        <p className="font-display text-base text-slate-900">
          Supported Websites
        </p>
        <ul
          role="list"
          className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
        >
          {[
            [
              { name: 'Transistor', logo: logoTransistor },
              { name: 'Tuple', logo: logoTuple },
              { name: 'StaticKit', logo: logoStaticKit },
            ],
            [
              { name: 'Mirage', logo: logoMirage },
              { name: 'Laravel', logo: logoLaravel },
              { name: 'Statamic', logo: logoStatamic },
            ],
          ].map((group, groupIndex) => (
            <li key={groupIndex}>
              <ul
                role="list"
                className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
              >
                {group.map((company) => (
                  <li key={company.name} className="flex">
                    <Image src={company.logo} alt={company.name} unoptimized />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-2xl">
          {/* <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software designer, founder, and amateur astronaut.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Spencer, a software designer and entrepreneur based in New York
            City. I’m the founder and CEO of Planetaria, where we develop
            technologies that empower regular people to explore space on their
            own terms.
          </p> */}
          {/* <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://instagram.com"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://linkedin.com"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div> */}

          {/* <div className="flex justify-center">
            <Article key="Title" article={article1}/>
          </div> */}



        </div>

      {/* 显示回复消息 */}
      {/* {summaryData && (
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          {summaryData.reply}
        </p>
      )} */}

      
      {summaryData && (
        <div className="flex justify-center">
          <div style={{ width: '800px', height: '400px', position: 'relative', textAlign: 'left'}}>
            <Article key="Title" article={article1} />
            <div style={{ position: 'absolute', top: '0', right: '0', display: 'flex', gap: '8px' }}>
              <button>copy</button>
              <button>download</button>
            </div>
          </div>
      </div>
      
      )} 



      </div>
    </Container>
  );
}

