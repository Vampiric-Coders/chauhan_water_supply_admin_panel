import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Droplets,
  Mail,
  Lock,
  Phone,
  User,
  Building2,
  Home,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { loginApi, signupApi } from "../../apis/Auth/Auth";
import toast, { Toaster } from "react-hot-toast";

export default function AuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm: "",
  });
  // const [profile, setProfile] = useState({
  //   society: "",
  //   flat: "",
  // });

  const [error, setError] = useState(""); // For inline form errors

  const societies = [
    "Green Valley Apartments",
    "Blue Ridge Society",
    "Sunshine Residency",
  ];

  const fakeDelay = () => new Promise((r) => setTimeout(r, 800));

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   await fakeDelay();
  //   navigate(login.email === "admin@aquapure.com" ? "/admin" : "/dashboard");
  //   setLoading(false);
  // };

  const handleLogin = async (e) => {
    setError("");

    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginApi(login.email, login.password);

      // optional
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      //  toast.success("Login successful 🚀");
      //  setTimeout(() => {

      navigate("/dashboard");
      //  }, 3000);
    } catch (err) {
      console.log("toast aaya?");
      // toast.error(err.response?.data?.message || "Login failed");
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signup.password !== signup.confirm) {
      alert("Passwords do not match");
      return;
    }
    setStep("onboarding");
  };

  const handleOnboarding = async (e) => {
    // e.preventDefault();
    // setLoading(true);
    // await fakeDelay();
    // console.log('signup h?')
    // // navigate("/dashboard");
    // setLoading(false);

    setError("");

    e.preventDefault();
    setLoading(true);

    try {
      const res = await signupApi(signup.name, signup.email,signup.phoneNumber,signup.password);
      // console.log(first)

      // optional
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);

        console.log('signup check--->')
      }

       toast.success("Signup successful 🚀");
      setSignup({
        name:'',
        email:'',
        phoneNumber:'',
        password:'',
        confirm:'',

      })
      //  setTimeout(() => {
         console.log('login redirect hua se pehle--')
        setStep("login");
        console.log('login redirect hua se baad--')

      // navigate("/dashboard");
      //  }, 3000);
    } catch (err) {
      console.log("toast aaya?");
      // toast.error(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* HERO */}
      <div className="hero mb-12">
        <div className="logo">
          <Droplets size={34} />
        </div>
        <h1>Chauhan Water Supply</h1>
        <p>Fresh water, delivered to your doorstep</p>
      </div>

      {/* CARD */}
      <div className="card">
        {step === "login" && (
          <>
            <h2>Welcome Back</h2>
            <p className="sub">Sign in to manage your water deliveries</p>

            <form onSubmit={handleLogin}>
              <Input
                icon={<Mail size={16} />}
                placeholder="Email or Phone"
                value={login.email}
                // onChange={(e) =>
                //   setLogin({ ...login, email: e.target.value })
                // }
                onChange={(e) => {
                  setLogin({ ...login, email: e.target.value });
                  setError(""); // clear inline error
                }}
              />
              <Input
                icon={<Lock size={16} />}
                type="password"
                placeholder="Password"
                value={login.password}
                // onChange={(e) =>
                //   setLogin({ ...login, password: e.target.value })
                // }

                onChange={(e) => {
                  setLogin({ ...login, password: e.target.value });
                  setError(""); // clear inline error
                }}
              />
              {error && <p className="form-error">{error}</p>}

              <button className="primary" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"} <ArrowRight size={16} />
              </button>

              <p className="footer">
                Don&apos;t have an account?{" "}
                <span onClick={() => setStep("signup")}>Sign Up</span>
              </p>

              <p className="demo">
                Demo: any email for user, <b>admin@aquapure.com</b> for admin
              </p>
            </form>
          </>
        )}

        {step === "signup" && (
          <>
            <h2>Create Account</h2>
            <p className="sub">Join thousands of happy customers</p>

            <form onSubmit={handleSignup}>
              <Input
                icon={<Mail size={16} />}
                placeholder="Email"
                value={signup.email}
                onChange={(e) =>
                  setSignup({ ...signup, email: e.target.value })
                }
              />
              <Input
                icon={<Lock size={16} />}
                type="password"
                placeholder="Password"
                value={signup.password}
                onChange={(e) =>
                  setSignup({ ...signup, password: e.target.value })
                }
              />
              <Input
                icon={<Lock size={16} />}
                type="password"
                placeholder="Confirm Password"
                value={signup.confirm}
                onChange={(e) =>
                  setSignup({ ...signup, confirm: e.target.value })
                }
              />

              <button className="primary">
                Continue <ArrowRight size={16} />
              </button>

              <p className="footer">
                Already have an account?{" "}
                <span onClick={() => setStep("login")}>Sign In</span>
              </p>
            </form>
          </>
        )}

        {step === "onboarding" && (
          <>
            <h2>Complete Your Profile</h2>
            <p className="sub">Help us deliver to your doorstep</p>

            <form onSubmit={handleOnboarding}>
              <Input
                icon={<User size={16} />}
                placeholder="Full Name"
                value={signup.name}
                onChange={(e) =>
                  setSignup({ ...signup, name: e.target.value })
                }
              />
              <Input
                icon={<Phone size={16} />}
                placeholder="Phone Number"
                value={signup.phoneNumber}
                onChange={(e) =>
                  setSignup({ ...signup, phoneNumber: e.target.value })
                }
              />

              <div className="row">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setStep("signup")}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button className="primary" disabled={loading}>
                  {loading ? "Creating..." : "Get Started"}
                </button>
              </div>
               <p className="footer">
                Already have an account?{" "}
                <span onClick={() => setStep("login")}>Sign In</span>
              </p>
            </form>
          </>
        )}
      </div>

      {/* STYLES */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Inter, system-ui, sans-serif;
        }

        body {
          margin: 0;
        }

        .page {
          min-height: 100vh;
          background: #f5f7fb;
        }

        .hero {
          height: 280px;
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: white;
          text-align: center;
          padding-top: 56px;
        }

        .logo {
          width: 72px;
          height: 72px;
          background: rgba(255,255,255,0.25);
          margin: 0 auto 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        .hero h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .hero p {
        
          font-size: 15px;
          opacity: 0.9;
        }

        .card {
          max-width: 400px;
          background: white;
          margin: -90px auto 0;
          padding: 16px;
          border-radius: 18px;
          box-shadow: 0 20px 45px rgba(0,0,0,0.12);
        }

        h2 {
          text-align: center;
          margin-bottom: 8px;
          font-size: 22px;
          font-weight: 700;
        }

        .sub {
          text-align: center;
          color: #64748b;
          margin-bottom: 24px;
          font-size: 14px;
        }

        .input {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid #e2e8f0;
          padding: 14px 16px;
          border-radius: 14px;
          margin-bottom: 16px;
          transition: border 0.2s, box-shadow 0.2s;
        }

        .input:focus-within {
          border-color: #0284c7;
          box-shadow: 0 0 0 3px rgba(2,132,199,0.15);
        }

        .input input,
        .input select {
          border: none;
          outline: none;
          width: 100%;
          font-size: 14px;
          background: transparent;
        }

        .primary {
          width: 100%;
          background: #0284c7;
          color: white;
          border: none;
          padding: 15px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(2,132,199,0.35);
        }

        .secondary {
          flex: 1;
          padding: 15px;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          background: white;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }

        .row {
          display: flex;
          gap: 10px;
        }

        .footer {
          text-align: center;
          margin-top: 18px;
          font-size: 14px;
        }

        .footer span {
          color: #0284c7;
          font-weight: 600;
          cursor: pointer;
        }

        .demo {
          margin-top: 18px;
          font-size: 12px;
          text-align: center;
          color: #64748b;
          border-top: 1px solid #e2e8f0;
          padding-top: 12px;
        }
      `}</style>
      <div>
        <Toaster/>
      </div>
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="input">
      {icon}
      <input required {...props} />
    </div>
  );
}
