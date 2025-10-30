"use client";

import Link from "next/link";
import { Modal } from "./modal";
import { socials } from "@shared/lib";
import { CommunityIcon, InfoIcon, LinkIcon } from "@shared/icons";
import { JoinToNewsletter } from "./join-to-newsletter";

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
            className="inline-flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400 sm:w-auto transition-colors cursor-pointer"
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
            <LinkIcon className="size-5" />
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

        <JoinToNewsletter />

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <InfoIcon className="size-5 text-blue-400" />
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
