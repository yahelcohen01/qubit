"use client";

import Link from "next/link";
import { Modal } from "./modal";
import { socials } from "@shared/lib";
import { CommunityIcon } from "../shared/icons";

interface CommunityWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommunityWelcomeModal({
  isOpen,
  onClose,
}: CommunityWelcomeModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Welcome to Qubit IL!"
      size="lg"
      icon={<CommunityIcon className="size-6 text-blue-400" />}
      iconBgClassName="bg-blue-500/10"
      footer={
        <div className="flex w-full justify-center sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400 sm:w-auto transition-colors"
          >
            Got it!
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="text-sm text-gray-300">
          <p className="mb-3">
            Israel&apos;s leading quantum community connecting researchers,
            industry leaders, and innovators.
          </p>
          <p className="mb-4">
            Join our community to stay updated on quantum events, networking
            opportunities, and the latest developments in quantum technology. ⚛️
          </p>
        </div>

        <div className="bg-black border border-white/15 rounded-lg p-4">
          <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>
            Join Our Community
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {socials.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md bg-black border border-white/15 p-3 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-all duration-200 group"
              >
                <div className="flex-shrink-0 text-white/70 group-hover:text-white transition-colors">
                  {social.icon}
                </div>
                <span className="truncate">{social.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg
                className="size-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white mb-1">
                Why Join Qubit IL?
              </p>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Access to exclusive quantum events and workshops</li>
                <li>• Network with 1000+ quantum professionals</li>
                <li>• Stay updated on Israel&apos;s quantum ecosystem</li>
                <li>• Connect with leading researchers and startups</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
