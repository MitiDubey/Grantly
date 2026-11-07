import { StudentProfile } from '../types';

const STORAGE_KEY = 'grantly_backend_users';

function getStoredUsers(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StudentProfile[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export const BackendAuthService = {
  async register(data: { email: string; name?: string; password?: string }): Promise<StudentProfile> {
    const users = getStoredUsers();
    let existing = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email address already exists. Please sign in.');
    }

    const newUser: StudentProfile = {
      id: 'usr_' + Date.now(),
      name: data.name || data.email.split('@')[0].replace('.', ' '),
      email: data.email,
      course: 'Computer Science',
      year: 3,
      state: 'Maharashtra',
      familyIncome: 550000,
      category: 'General',
      academicScore: 84,
    };

    users.push(newUser);
    saveUsers(users);

    // Also attempt background sync with Node server if running
    try {
      fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(() => {});
    } catch {}

    return newUser;
  },

  async login(email: string): Promise<StudentProfile> {
    const users = getStoredUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Auto-create user account if not existing
      user = {
        id: 'usr_' + Date.now(),
        name: email.split('@')[0].replace('.', ' '),
        email: email,
        course: 'Computer Science',
        year: 3,
        state: 'Maharashtra',
        familyIncome: 550000,
        category: 'General',
        academicScore: 84,
      };
      users.push(user);
      saveUsers(users);
    }

    try {
      fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).catch(() => {});
    } catch {}

    return user;
  },

  async googleAuth(profile: { name: string; email: string; picture?: string; sub?: string }): Promise<StudentProfile> {
    const users = getStoredUsers();
    let user = users.find(u => u.email.toLowerCase() === profile.email.toLowerCase());

    if (!user) {
      user = {
        id: 'usr_g_' + Date.now(),
        name: profile.name || 'Google Scholar',
        email: profile.email,
        avatar: profile.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        course: 'Computer Science',
        year: 3,
        state: 'Maharashtra',
        familyIncome: 550000,
        category: 'General',
        academicScore: 86,
      };
      users.push(user);
    } else {
      user.name = profile.name || user.name;
      if (profile.picture) user.avatar = profile.picture;
    }

    saveUsers(users);

    try {
      fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      }).catch(() => {});
    } catch {}

    return user;
  },

  async logout(): Promise<void> {
    try {
      fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
      }).catch(() => {});
    } catch {}
  },

  getAllAccounts(): StudentProfile[] {
    return getStoredUsers();
  }
};

