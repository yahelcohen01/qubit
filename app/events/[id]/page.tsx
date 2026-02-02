import { Activity } from "@shared/types";
import Activities from "@/data/activities.json";
import { notFound } from "next/navigation";
import { DateUtils } from "@shared/lib";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Mail,
  ExternalLink,
  ArrowLeft,
  Tag,
} from "lucide-react";

export async function generateStaticParams() {
  return Activities.map((activity) => ({
    id: activity.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = Activities.find((a) => a.id === id) as Activity | undefined;

  if (!activity) {
    return { title: "Event Not Found" };
  }

  return {
    title: `${activity.title} | Qubit Events`,
    description: activity.description,
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = Activities.find((a) => a.id === id) as Activity | undefined;

  if (!activity) {
    notFound();
  }

  const hasTime = activity.startTime || activity.endTime;
  const hasOrganizer = activity.organizer?.name || activity.organizer?.email;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${activity.img})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

        {/* Back Button */}
        <Link
          href="/events"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Events</span>
        </Link>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            {activity.tags && activity.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4">
              {activity.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{DateUtils.formatDate(activity.date)}</span>
              </div>
              {activity.location?.name && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{activity.location.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-normal mb-4">About This Event</h2>
              <p className="text-white/70 leading-relaxed text-lg">
                {activity.description}
              </p>
            </section>

            {/* Agenda - MOCK DATA */}
            {activity.agenda && (
              <section>
                <h2 className="text-2xl font-normal mb-4">Agenda</h2>
                <p className="text-xs text-yellow-500 mb-3">
                  [MOCK DATA - Edit in activities.json]
                </p>
                <div className="space-y-4">
                  {activity.agenda.map(
                    (
                      item: { time: string; title: string; speaker?: string },
                      index: number,
                    ) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-white/5 rounded-xl"
                      >
                        <div className="text-cyan-400 font-mono text-sm w-20 flex-shrink-0">
                          {item.time}
                        </div>
                        <div>
                          <div className="font-normal">{item.title}</div>
                          {item.speaker && (
                            <div className="text-white/50 text-sm mt-1">
                              {item.speaker}
                            </div>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}

            {/* Speakers - MOCK DATA */}
            {activity.speakers && activity.speakers.length > 0 && (
              <section>
                <h2 className="text-2xl font-normal mb-4">Speakers</h2>
                <p className="text-xs text-yellow-500 mb-3">
                  [MOCK DATA - Edit in activities.json]
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activity.speakers.map(
                    (
                      speaker: {
                        name: string;
                        role?: string;
                        company?: string;
                        image?: string;
                      },
                      index: number,
                    ) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-white/5 rounded-xl"
                      >
                        {speaker.image ? (
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl">
                            {speaker.name.charAt(0)}
                          </div>
                        )}
                        <div className="flex flex-col justify-center">
                          <div className="font-normal">{speaker.name}</div>
                          {(speaker.role || speaker.company) && (
                            <div className="text-white/50 text-sm">
                              {speaker.role}
                              {speaker.role && speaker.company && " at "}
                              {speaker.company}
                            </div>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="bg-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-normal mb-4">Event Details</h3>

              {/* Date */}
              <div className="flex items-start gap-3">
                <Calendar size={20} className="text-cyan-400 mt-0.5" />
                <div>
                  <div className="text-sm text-white/50">Date</div>
                  <div>{DateUtils.formatDate(activity.date)}</div>
                </div>
              </div>

              {/* Time */}
              {hasTime && (
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-white/50">Time</div>
                    <div>
                      {activity.startTime}
                      {activity.endTime && ` - ${activity.endTime}`}
                    </div>
                    <p className="text-xs text-yellow-500">
                      [MOCK - Edit in activities.json]
                    </p>
                  </div>
                </div>
              )}

              {/* Location */}
              {activity.location?.name && (
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-white/50">Location</div>
                    <div>{activity.location.name}</div>
                    {activity.location.address && (
                      <div className="text-white/50 text-sm">
                        {activity.location.address}
                        <p className="text-xs text-yellow-500">
                          [MOCK - Edit in activities.json]
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Capacity */}
              {activity.capacity && (
                <div className="flex items-start gap-3">
                  <Users size={20} className="text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-white/50">Capacity</div>
                    <div>{activity.capacity} attendees</div>
                    <p className="text-xs text-yellow-500">
                      [MOCK - Edit in activities.json]
                    </p>
                  </div>
                </div>
              )}

              {/* Tags */}
              {activity.tags && activity.tags.length > 0 && (
                <div className="flex items-start gap-3">
                  <Tag size={20} className="text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-white/50">Topics</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activity.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-yellow-500 mt-1">
                      [MOCK - Edit in activities.json]
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Organizer Card */}
            {hasOrganizer && (
              <div className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-normal mb-4">Organizer</h3>
                <p className="text-xs text-yellow-500 mb-3">
                  [MOCK DATA - Edit in activities.json]
                </p>
                {activity.organizer?.name && (
                  <div className="font-normal">{activity.organizer.name}</div>
                )}
                {activity.organizer?.email && (
                  <a
                    href={`mailto:${activity.organizer.email}`}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mt-2"
                  >
                    <Mail size={16} />
                    <span className="text-sm">{activity.organizer.email}</span>
                  </a>
                )}
              </div>
            )}

            {/* Register Button */}
            {activity.url ? (
              <a
                href={activity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-xl transition-colors"
              >
                <span>Register Now</span>
                <ExternalLink size={18} />
              </a>
            ) : (
              <div className="text-center text-white/50 text-sm py-4">
                Registration details coming soon
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
