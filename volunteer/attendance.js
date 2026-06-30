/*
====================================
NSS Attendance Engine
Version: 1.0
====================================
*/

let attendanceMap = {};
let totalActivities = 0;

/*
------------------------------------
Convert:
25-001 -> NSS-2025-001
26-014 -> NSS-2026-014
------------------------------------
*/
function expandVolunteerId(shortId) {

    if (!shortId) return "";

    const [year, number] =
        shortId.trim().split("-");

    return `NSS-20${year}-${number}`;
}

/*
------------------------------------
Attendance Status
------------------------------------
*/
function getAttendanceStatus(
    percentage
) {

    if (percentage >= 90) {
        return {
            label: "Excellent",
            color: "green",
            icon: "🟢"
        };
    }

    if (percentage >= 75) {
        return {
            label: "Good",
            color: "blue",
            icon: "🔵"
        };
    }

    if (percentage >= 50) {
        return {
            label: "Average",
            color: "orange",
            icon: "🟡"
        };
    }

    return {
        label: "Low",
        color: "red",
        icon: "🔴"
    };
}

/*
------------------------------------
Load all attendance files
------------------------------------
*/
async function loadAttendanceData() {

    attendanceMap = {};

    const attendanceIds = [
    ...ACTIVITIES.map(
        activity => activity.id
    ),

    ...MEETINGS.map(
        meeting => meeting.id
    )
];

    totalActivities =
    attendanceIds.length;

    for (
    const eventId
    of attendanceIds
) {

        try {

            const response =
                await fetch(
                     `../data/attendance/${eventId}.csv`
                );

                

            if (!response.ok) {
                continue;
            }

            const csv =
                await response.text();

            const rows =
                csv
                .split("\n")
                .filter(
                    row => row.trim()
                );

            rows.forEach(row => {

                const [
                    shortId,
                    value
                ] = row.split(",");

                const mark =
                    (value || "")
                    .trim()
                    .toLowerCase();

                const present =
    mark === "x" ||
    mark === "1" ||
    mark === "present" ||
    mark === "yes";


                if (!present) {
                    return;
                }

                const fullId =
                    expandVolunteerId(
                        shortId
                    );

                attendanceMap[
                    fullId
                ] =
                    (
                        attendanceMap[
                            fullId
                        ] || 0
                    ) + 1;

            });

        }
        catch (error) {

            console.warn(
                `Attendance file missing: ${eventId}.csv`
            );

        }

    }

    console.log(
        "Attendance loaded:",
        attendanceMap
    );
}

/*
------------------------------------
Percentage
------------------------------------
*/
function getAttendancePercentage(
    volunteerId
) {

    if (
        totalActivities === 0
    ) {
        return 0;
    }

    const present =
        attendanceMap[
            volunteerId
        ] || 0;

    return Math.round(
        (
            present /
            totalActivities
        ) * 100
    );
}

/*
------------------------------------
Present Count
------------------------------------
*/
function getAttendancePresentCount(
    volunteerId
) {

    return (
        attendanceMap[
            volunteerId
        ] || 0
    );
}

/*
------------------------------------
Tooltip Text
------------------------------------
*/
function getAttendanceTooltip(
    volunteerId
) {

    const percentage =
        getAttendancePercentage(
            volunteerId
        );

    const status =
        getAttendanceStatus(
            percentage
        );

    const present =
        getAttendancePresentCount(
            volunteerId
        );

    return `
${status.icon} ${status.label} Attendance

Present:
${present} / ${totalActivities}

Attendance:
${percentage}%

${
    percentage >= 90
    ? "Outstanding participation in NSS activities."
    : percentage >= 75
    ? "Good participation level."
    : percentage >= 50
    ? "Participation is average. Try attending more programmes."
    : "Low attendance. Participation improvement is recommended."
}
`;
}

/*
------------------------------------
HTML Badge
------------------------------------
*/
function renderAttendanceBadge(
    volunteerId
) {

    const percentage =
        getAttendancePercentage(
            volunteerId
        );

    const status =
        getAttendanceStatus(
            percentage
        );

    return `
        <div
            class="
                volunteer-attendance-badge
                volunteer-attendance-${status.color}
            "
            title="
${getAttendanceTooltip(
    volunteerId
)}
            "
        >
            ${percentage}%
        </div>
    `;
}

/*
------------------------------------
ID Card Badge
------------------------------------
*/
function renderAttendanceInfo(
    volunteerId
) {

    const percentage =
        getAttendancePercentage(
            volunteerId
        );

    const status =
        getAttendanceStatus(
            percentage
        );

    return `
        <div class="volunteer-id-attendance">

            <span
                class="
                    volunteer-id-attendance-score
                    volunteer-attendance-${status.color}
                "
            >
                ${percentage}%
            </span>

            <button
                class="
                    volunteer-attendance-info
                "
                title="
${getAttendanceTooltip(
    volunteerId
)}
                "
            >
                i
            </button>

        </div>
    `;
}