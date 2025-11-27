export interface Academy {
    id: string
    name: string
    email: string
    contactPerson: string
    phoneNumber: string
    location: string
    state: string
    athletesReviewed: number
    athletesApproved: number
    athletesRejected: number
    status: 'active' | 'inactive'
    createdAt: string
}

export const mockAcademies: Academy[] = [
    {
        id: '1',
        name: 'Delhi Sports Academy',
        email: 'contact@delhisports.com',
        contactPerson: 'Vikram Singh',
        phoneNumber: '+91-9876543210',
        location: 'Delhi',
        state: 'Delhi',
        athletesReviewed: 45,
        athletesApproved: 32,
        athletesRejected: 13,
        status: 'active',
        createdAt: '2024-01-15T10:00:00Z',
    },
    {
        id: '2',
        name: 'Mumbai Athletic Center',
        email: 'info@mumbaiathleticrohit.com',
        contactPerson: 'Priya Desai',
        phoneNumber: '+91-9876543211',
        location: 'Mumbai',
        state: 'Maharashtra',
        athletesReviewed: 38,
        athletesApproved: 28,
        athletesRejected: 10,
        status: 'active',
        createdAt: '2024-02-10T10:00:00Z',
    },
    {
        id: '3',
        name: 'Bangalore Football Academy',
        email: 'admin@bangalorefootball.com',
        contactPerson: 'Suresh Kumar',
        phoneNumber: '+91-9876543212',
        location: 'Bangalore',
        state: 'Karnataka',
        athletesReviewed: 29,
        athletesApproved: 22,
        athletesRejected: 7,
        status: 'active',
        createdAt: '2024-01-20T10:00:00Z',
    },
    {
        id: '4',
        name: 'Chennai Cricket Academy',
        email: 'contact@chennaicricket.com',
        contactPerson: 'Anita Raman',
        phoneNumber: '+91-9876543213',
        location: 'Chennai',
        state: 'Tamil Nadu',
        athletesReviewed: 52,
        athletesApproved: 41,
        athletesRejected: 11,
        status: 'active',
        createdAt: '2023-12-05T10:00:00Z',
    },
    {
        id: '5',
        name: 'Pune Athletics Training Center',
        email: 'pune@athletics.com',
        contactPerson: 'Rahul Patil',
        phoneNumber: '+91-9876543214',
        location: 'Pune',
        state: 'Maharashtra',
        athletesReviewed: 31,
        athletesApproved: 24,
        athletesRejected: 7,
        status: 'active',
        createdAt: '2024-03-01T10:00:00Z',
    },
    {
        id: '6',
        name: 'Hyderabad Badminton Academy',
        email: 'info@hyderabadbadminton.com',
        contactPerson: 'Lakshmi Reddy',
        phoneNumber: '+91-9876543215',
        location: 'Hyderabad',
        state: 'Telangana',
        athletesReviewed: 27,
        athletesApproved: 19,
        athletesRejected: 8,
        status: 'active',
        createdAt: '2024-02-15T10:00:00Z',
    },
    {
        id: '7',
        name: 'Kolkata Sports Institute',
        email: 'admin@kolkatasports.com',
        contactPerson: 'Amit Chatterjee',
        phoneNumber: '+91-9876543216',
        location: 'Kolkata',
        state: 'West Bengal',
        athletesReviewed: 19,
        athletesApproved: 14,
        athletesRejected: 5,
        status: 'active',
        createdAt: '2024-04-10T10:00:00Z',
    },
    {
        id: '8',
        name: 'Ahmedabad Swimming Academy',
        email: 'contact@ahmedabadswimming.com',
        contactPerson: 'Neha Shah',
        phoneNumber: '+91-9876543217',
        location: 'Ahmedabad',
        state: 'Gujarat',
        athletesReviewed: 15,
        athletesApproved: 11,
        athletesRejected: 4,
        status: 'inactive',
        createdAt: '2024-01-08T10:00:00Z',
    },
]

export interface AcademyReview {
    id: string
    athleteId: string
    athleteName: string
    academyId: string
    academyName: string
    status: 'approved' | 'rejected'
    notes: string
    reviewedBy: string
    reviewedAt: string
}

export const mockAcademyReviews: AcademyReview[] = [
    {
        id: '1',
        athleteId: 'athlete-1',
        athleteName: 'Athlete 1',
        academyId: '1',
        academyName: 'Delhi Sports Academy',
        status: 'approved',
        notes: 'Excellent performance in vertical jump test',
        reviewedBy: 'Vikram Singh',
        reviewedAt: '2024-11-20T14:30:00Z',
    },
    {
        id: '2',
        athleteId: 'athlete-2',
        athleteName: 'Athlete 2',
        academyId: '2',
        academyName: 'Mumbai Athletic Center',
        status: 'approved',
        notes: 'Good stamina and endurance',
        reviewedBy: 'Priya Desai',
        reviewedAt: '2024-11-21T10:15:00Z',
    },
    {
        id: '3',
        athleteId: 'athlete-3',
        athleteName: 'Athlete 3',
        academyId: '1',
        academyName: 'Delhi Sports Academy',
        status: 'rejected',
        notes: 'Needs improvement in flexibility',
        reviewedBy: 'Vikram Singh',
        reviewedAt: '2024-11-22T16:00:00Z',
    },
]

export interface AcademyActivity {
    id: string
    academyId: string
    activityType: 'review_approved' | 'review_rejected'
    description: string
    athleteId: string
    athleteName: string
    timestamp: string
}

export const mockAcademyActivities: AcademyActivity[] = [
    {
        id: '1',
        academyId: '1',
        activityType: 'review_approved',
        description: 'Approved athlete Athlete 1',
        athleteId: 'athlete-1',
        athleteName: 'Athlete 1',
        timestamp: '2024-11-27T10:30:00Z',
    },
    {
        id: '2',
        academyId: '1',
        activityType: 'review_rejected',
        description: 'Rejected athlete Athlete 3',
        athleteId: 'athlete-3',
        athleteName: 'Athlete 3',
        timestamp: '2024-11-27T14:15:00Z',
    },
    {
        id: '3',
        academyId: '2',
        activityType: 'review_approved',
        description: 'Approved athlete Athlete 2',
        athleteId: 'athlete-2',
        athleteName: 'Athlete 2',
        timestamp: '2024-11-26T16:45:00Z',
    },
]
