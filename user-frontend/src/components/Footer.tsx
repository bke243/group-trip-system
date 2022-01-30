import { MapIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2">
            <Link
              to="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <MapIcon className="w-10 h-10" />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                Group Trip Settlement
              </span>
            </Link>
            <div className="mt-6 lg:max-w-md">
              <p className="text-sm text-gray-800">
              Simple platform that will allow users to plan, manage group trip in the form of a Web System. The single key word in the aim is to emphasize that the process of coordinating, booking group trips is done in on place in the form of package depending on the group persons number which allows every group member to access quickly and in a centralized manner relevant information.
              </p>

            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide text-gray-900">
              Contacts
            </p>
            <div className="flex">
              <p className="mr-1 text-gray-800">Phone:</p>
              <a
                href="tel:850-123-5021"
                aria-label="Our phone"
                title="Our phone"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                850-123-5021
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800">Email:</p>
              <a
                href="mailto:info@grouptripsettlement.com"
                aria-label="Our email"
                title="Our email"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                info@grouptripsettlement.com
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800">Address:</p>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Our address"
                title="Our address"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                312 Lovely Street, NY
              </a>
            </div>
          </div>

        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-gray-600">
            © Copyright 2022 Group Trip Settlement Inc. All rights reserved.
          </p>
        
        </div>
      </div>
    );
  };