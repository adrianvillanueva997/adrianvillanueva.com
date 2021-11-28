import React from 'react';
import userData from '@constants/data';

export default function AboutMe() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
          About Me.
        </h1>
      </div>
      <div className="bg-[#F1F1F1] -mt-10 dark:bg-gray-900">
        <div className="text-container max-w-6xl mx-auto pt-20">
          <p
            className="leading-loose text-2xl md:text-4xl font-semibold  mx-4"
            style={{ lineHeight: '3rem' }}
          >
            {userData.about.title}. Currently working at{' '}
            <a
              className="bg-red-500 rounded-md px-2 py-1 text-white"
              href={userData.about.currentProjectUrl}
            >
              {userData.about.currentProject}
            </a>
          </p>
        </div>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 px-4">
        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-y-20 gap-x-20">
          {/* Social Buttons */}
          <div className="inline-flex flex-col">
            <div>
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Contact
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                For any sort help / enquiry, shoot a{' '}
                <a
                  href={`mailto:${userData.email}`}
                  className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                >
                  mail
                </a>{' '}
                and I'll get back. I swear.
              </p>
            </div>
            <div className="mt-8">
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Job Opportunities
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                I'm open for new opportunities, if you see me as a good fit,
                check my{' '}
                <a
                  href={userData.resumeUrl}
                  target="__blank"
                  className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                >
                  CV
                </a>{' '}
                and I'd love to hear from you!.
              </p>
            </div>
            {/* Social Links */}
            <h1 className="text-xl font-semibold text-gray-700 mt-8 dark:text-gray-200">
              Social Links
            </h1>
            <div className="mt-4 ml-4">
              <div className="flex flex-row justify-start items-center ">
                <a
                  href={userData.socialLinks.github}
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <p className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                    GitHub
                  </p>
                </a>
              </div>
              <div className="flex flex-row justify-start items-center">
                <a
                  href={userData.socialLinks.linkedin}
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <p className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                    LinkedIn
                  </p>
                </a>
              </div>
              <div className="flex flex-row justify-start items-center">
                <a
                  href={userData.socialLinks.blog}
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <p className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                    My blog
                  </p>
                </a>
              </div>
              <div className="flex flex-row justify-start items-center">
                <a
                  href={userData.socialLinks.twitter}
                  className="flex flex-row items-center space-x-4 group"
                >
                  <div className="my-4">&rarr;</div>
                  <p className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                    <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                    Twitter
                  </p>
                </a>
              </div>
            </div>
          </div>
          {/* Text area */}
          <div className="col-span-1 md:col-span-2">
            {userData.about.description?.map((desc, idx) => (
              <p
                key={idx}
                className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
              >
                {desc}
              </p>
            ))}

            <h2 className="bg-red-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-gray-50">
              Programming Languages
            </h2>

            <div className="flex flex-row flex-wrap mt-8">
              <img
                src="/tech/cpp.png"
                className="h-20 w-20 mx-4 my-4"
                alt="c++"
              />
              <img
                src="/tech/python.png"
                className="h-20 w-20 mx-4 my-4"
                alt="python"
              />
              <img
                src="/tech/go.png"
                className="h-20 w-20 mx-4 my-4"
                alt="golang"
              />
              <img
                src="/tech/java.png"
                className="h-20 w-20 mx-4 my-4"
                alt="java"
              />
              <img
                src="/tech/nodejs.png"
                className="h-20 w-20 mx-4 my-4"
                alt="node js"
              />
              <img
                src="/tech/typescript.png"
                className="h-20 w-20 mx-4 my-4"
                alt="typescript"
              />
              <img
                src="/tech/rust.png"
                className="h-20 w-20 mx-4 my-4"
                alt="rust"
              />
              <img src="/tech/c.png" className="h-20 w-20 mx-4 my-4" alt="c" />
              <img
                src="/tech/sql.png"
                className="h-20 w-20 mx-4 my-4"
                alt="sql"
              />
            </div>
            <h2 className="bg-red-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-gray-50">
              Frontend
            </h2>
            <div className="flex flex-row flex-wrap mt-8">
              <img
                src="/tech/react.png"
                className="h-20 w-20 mx-4 my-4"
                alt="react"
              />
              <img
                src="/tech/vue.png"
                className="h-20 w-20 mx-4 my-4"
                alt="vue"
              />
              <img
                src="/tech/bootstrap.png"
                className="h-20 w-20 mx-4 my-4"
                alt="bootstrap"
              />
            </div>
            <h2 className="bg-red-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-gray-50">
              Backend
            </h2>
            <div className="flex flex-row flex-wrap mt-8">
              <img
                src="/tech/fastapi.png"
                className="h-20 w-20 mx-4 my-4"
                alt="fastapi"
              />
              <img
                src="/tech/flask.png"
                className="h-20 w-20 mx-4 my-4"
                alt="flask"
              />
              <img
                src="/tech/express.png"
                className="h-20 w-20 mx-4 my-4"
                alt="express"
              />
              <img
                src="/tech/nextjs.png"
                className="h-20 w-20 mx-4 my-4"
                alt="nextjs"
              />
            </div>
            <h2 className="bg-red-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-gray-50">
              Devops
            </h2>
            <div className="flex flex-row flex-wrap mt-8">
              <img
                src="/tech/git.png"
                className="h-20 w-20 mx-4 my-4"
                alt="git"
              />
              <img
                src="/tech/docker.png"
                className="h-20 w-20 mx-4 my-4"
                alt="docker"
              />
              <img
                src="/tech/kubernetes.png"
                className="h-20 w-20 mx-4 my-4"
                alt="kubernetes"
              />
              <img
                src="/tech/terraform.png"
                className="h-20 w-20 mx-4 my-4"
                alt="terraform"
              />
              <img
                src="/tech/jenkins.png"
                className="h-20 w-20 mx-4 my-4"
                alt="jenkins"
              />
              <img
                src="/tech/githubactions.png"
                className="h-20 w-20 mx-4 my-4"
              />
              <img
                src="/tech/prometheus.png"
                className="h-20 w-20 mx-4 my-4"
                alt="prometheus"
              />
              <img
                src="/tech/grafana.png"
                className="h-20 w-20 mx-4 my-4"
                alt="grafana"
              />
            </div>
            <h2 className="bg-red-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-gray-50">
              Cloud
            </h2>
            <div className="flex flex-row flex-wrap mt-8">
              <img
                src="/tech/aws.png"
                className="h-20 w-20 mx-4 my-4"
                alt="aws"
              />
              <img
                src="/tech/gcp.png"
                className="h-20 w-20 mx-4 my-4"
                alt="gcp"
              />
            </div>
            <h2 className="bg-red-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-gray-50">
              Database
            </h2>
            <div className="flex flex-row flex-wrap mt-8">
              <img
                src="/tech/mysql.png"
                className="h-20 w-20 mx-4 my-4"
                alt="mysql"
              />
              <img
                src="/tech/postgresql.png"
                className="h-20 w-20 mx-4 my-4"
                alt="postgresql"
              />
              <img
                src="/tech/mongodb.png"
                className="h-20 w-20 mx-4 my-4"
                alt="mongodb"
              />
              <img
                src="/tech/sqlite.png"
                className="h-20 w-20 mx-4 my-4"
                alt="sqlite"
              />
              <img
                src="/tech/cassandra.png"
                className="h-20 w-20 mx-4 my-4"
                alt="cassandra"
              />
              <img
                src="/tech/sqlserver.png"
                className="h-20 w-20 mx-4 my-4"
                alt="Microsoft SQL Server"
              />
            </div>

            <h2 className="bg-red-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-gray-50">
              Data Science
            </h2>
            <div className="flex flex-row flex-wrap mt-8">
              <img
                src="/tech/spark.png"
                className="h-20 w-20 mx-4 my-4"
                alt="apache spark"
              />
              <img
                src="/tech/hadoop.png"
                className="h-20 w-20 mx-4 my-4"
                alt="hadoop"
              />
              <img
                src="/tech/pandas.png"
                className="h-20 w-20 mx-4 my-4"
                alt="pandas"
              />
              <img
                src="/tech/keras.png"
                className="h-20 w-20 mx-4 my-4"
                alt="keras"
              />
              <img
                src="/tech/airflow.png"
                className="h-20 w-20 mx-4 my-4"
                alt="apche airflow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
