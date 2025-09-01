import React from "react";

interface Member {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface AvatarGroupProps {
  members: Member[];
}

function AvatarGroup({ members }: AvatarGroupProps) {
  return (
    <div className="flex -space-x-2">
      {members.slice(0, 3).map((member) => (
        <div
          key={member.id}
          className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700"
          style={{
            backgroundImage: member.avatarUrl
              ? `url(${member.avatarUrl})`
              : undefined,
            backgroundSize: "cover",
          }}
        >
          {!member.avatarUrl && member.name[0]}
        </div>
      ))}
      {members.length > 3 && (
        <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">
          +{members.length - 3}
        </div>
      )}
    </div>
  );
}

export default AvatarGroup;
