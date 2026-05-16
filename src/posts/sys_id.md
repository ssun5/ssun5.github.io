---
title: Techniques in System Identification
---
<h1 class="mt-0 pt-0 about_title">{{ title }}</h1>
System identification is the process of inferring a mathematical model of a dynamical system from observations of its inputs and outputs. 
Here are some of my notes on classical techniques in system identification, starting with first & second-order systems then progressing to high-order systems.

## System Identification by Step Response
Two model classes cover a large fraction of systems seen in real plants:

<b>
$$
G_1(s) = \frac{K}{\tau s + 1} \qquad G_2(s) = \frac{K\omega_n^2}{s^2 + 2\zeta \omega _n s + \omega_n^2}
$$
</b>

Thermal processes, RC filters, single-tank compartmental flow, and many chemical-reagent concentrations are well-approximated as first-order. Mechanical structures, RLC circuits, motor position loops, and most servo systems with a single dominant resonance are well-approximated as second-order.

This section derives the step responses of both classes, then shows how to back-derive the parameters from measured data.

## First Order Systems
A first-order linear time-invariant (LTI) system with steady-state gain and time constant has the transfer function

<b>
$$
\begin{equation}
G_1(s) = \frac{Y(s)}{U(s)} = \frac{K}{\tau s + 1},
\end{equation}
$$
</b>

equivalently the ODE $\tau\dot{y}(t) + y(t) = Ku(t)$ in the time domain.

For a unit step, the Laplace input is $U(s) = 1/s$. The step response of the first-order system is thus:

<b>
$$
Y(s) = \frac{K}{s(\tau s + 1)}
$$
</b>

Breaking up the expression into partial fractions and inverse-transforming yields the canonical exponential rise:

<b>
$$
Y(s) = \frac{K}{s(\tau s + 1)} = \frac{K}{s} - \frac{K\tau}{\tau s + 1} \quad \xrightarrow{\mathcal{L}^{-1}} \quad \boxed{y(t) = K(1-e^{-t/\tau}), \quad t \geq 0} 
$$
</b>

The single pole sits on the negative real axis. There is no overshoot, no oscillation, and no inflection: the response monotonically approaches $K$.

<img class="center" src="/assets/img/sys_id/first_order_step.svg" alt="first_order_step">

### Identification from Measured Response
Given that sytem transfer function takes the form
$$
G(s) = \frac{K}{\tau s + 1},
$$

the coefficients **$K$** and **$\tau$** can be derived from a measured response using the following methods.
<ol>
<li><b>Steady-state:</b> according to <i>Final Value Theorem (FVT)</i>, the steady-state value of the system step-response

$$
\lim_{t\to\infty} {y}(t) = \lim_{s\to 0} sY(s)
$$

substituting for above definitions

$$
\begin{align*}
\lim_{t\to\infty} {y}(t) &= \lim_{s\to 0} sY(s) \\\\
&= \lim_{s\to 0} s\cdot U(s)G(s) \\\\
&= \lim_{s\to 0} \frac{K}{\tau s + 1}
\end{align*}
$$
<b>
$$
\boxed{\lim_{t\to\infty} {y}(t) = K}
$$
</b>
</li>
<li><b>Time constant</b> 
<ul>
<li>
<b>Method 1:</b> find the time $t = \tau$ at which $y(t)$ reaches $0.632K$. This is a workhorse method.
<div class="my-4">
Recall that:  

$$
Y(s) = \frac{K}{s(\tau s + 1)} \quad \xrightarrow{\mathcal{L}^{-1}} \quad y(t) = K(1-e^{-t/\tau}), \quad t \geq 0
$$
$$
y(\tau) = K(1-e^{-1})
$$
<b>
$$
\boxed{y(\tau) = 0.632K}
$$
</b>
</div>
</li>
<li>
<b>Method 2:</b> estimate initial slope of the step response $\dot{y}(0)$ and use <b>$\tau = K/\dot{y}(0)$</b>. Refer to the figure above for a graphical approach. The relationship can be derived using <i>Initial Value Theorem (IVT)</i>.
<div class="my-4">
IVT:
$$
\lim_{t\to 0} {y}(t) = \lim_{s\to \infty} sY(s) \quad \rightarrow \quad \lim_{t\to 0} \dot{y}(t) = \lim_{s\to \infty} s\cdot(sY(s)) 
$$
$$
\begin{align*}
\lim_{s\to \infty} s\cdot(sY(s)) &= \lim_{s\to \infty} sG(s)\\\\
&= \lim_{s\to \infty} \frac{sK}{\tau s + 1} \\\\
&= K/\tau
\end{align*}
$$
<b>
$$
\boxed{\lim_{t\to 0} \dot{y}(t) = K/\tau }
$$
</b>
</div>
</li>
<br>
<li>
<b>Method 3:</b> log-linear fit. Define
<b>
$$
z(t) = \ln{(1-\frac{y(t)}{K})}
$$
</b>
For a true first-order system this is a straight line with slope <b>$-1/\tau$</b>. A benefit of this method is that deviation from linearity is a built-in diagnostic — if $z(t)$ is curved, the system is not truly first-order. This method is additionally more robust to measurement noise.
</li>
</ul>
</li>
</ol>

### Adding a Zero
A small change to the system unlocks a much richer set of behavior. Consider the transfer function:

<b>
$$
G(s) = \frac{K(\tau_z s + 1)}{\tau s + 1}
$$
</b>

A single zero has been added to the numerator. This is the canonical *lead-lag* network, the structure of a PI/PD action transferred through a first-order plant, and the smallest model that can exhibit a *non-minimum-phase* response — right-half plane (RHP) zero, causing the system response to initially move in the opposite direction of the control input — see example below, where $\tau_z = -0.2$.

<img class="center" src="/assets/img/sys_id/first_order_with_zero_step.svg" alt="first_order_step_with_zero">

Once again, we can apply FVT:
$$
\begin{align*}
\lim_{t\to\infty} {y}(t) &= \lim_{s\to 0} sY(s) \\\\
&= \lim_{s\to 0} G(s) \\\\
&= \lim_{s\to 0} \frac{K(\tau_z s + 1)}{\tau s + 1}
\end{align*}
$$

<b>
$$
\boxed{\lim_{t\to\infty} {y}(t) = K}
$$
</b>

, and IVT:

$$
\begin{align*}
\lim_{t\to 0} y(t) &= \lim_{s\to \infty} sY(s) \\\\
&= \lim_{s\to \infty} G(s) \\\\
&= \lim_{s\to \infty} \frac{K(\tau_z s + 1)}{\tau s + 1} \\\\
\end{align*}
$$

<b>
$$
\boxed{y(0^+) = \lim_{t\to 0} y(t) = K(\frac{\tau_z}{\tau})}
$$
</b>

$$
\begin{align*}
\lim_{t\to 0} \dot{y}(t) &= \lim_{s\to \infty} s\cdot(sY(s)) \\\\
&= \lim_{s\to \infty} sG(s) \\\\
&= \lim_{s\to \infty} \frac{K(\tau_z s + 1)s}{\tau s + 1} \\\\
&= \infty
\end{align*}
$$

Note that the initial slope at $\dot{y}(0^+)$ approaches infinity. This is because the zero causes an initial "jump" in the response. This is troublesome because it prevents us from finding the starting slope directly with IVT. However, suppose we account for the initial jump by subtracting it:

<div class="my-4">
let <b>$\widehat{\dot{y}(t)} = \mathcal{L}\left\{sY(s) - y(0^+)\right\}$
$$
\widehat{\dot{y}(0^+)} = \lim_{s\to \infty}s[sY(s) - y(0^+)]
$$
</b>
$$
sY(s) - y(0^+) = sY(s) - \frac{K\tau_z}{\tau} = \frac{K(\tau_z s + 1)}{\tau s + 1} - \frac{K\tau_z}{\tau} = \frac{K(\tau - \tau_z)}{\tau(\tau s + 1)}
$$
$$
\widehat{\dot{y}(0^+)} = \lim_{s\to \infty}s\left[\frac{K(\tau - \tau_z)}{\tau(\tau s + 1)}\right] = \frac{K(\tau - \tau_z)}{\tau^2}
$$
substitue $\tau_z = \frac{\tau y(0^+)}{K}$
$$
\begin{align*}
\widehat{\dot{y}(0^+)} &= \frac{K(\tau - \frac{\tau y(0^+)}{K})}{\tau^2} \\\\
&= \frac{K - y(0^+)}{\tau}
\end{align*}
$$
</div>

, it becomes clear that $\tau$ can be derived the same way as before, by finding the initial $\frac{\text{rise}}{\text{run}}$ of the step response — where $\text{rise} = K-y(0^+)$ and $\text{run} = \tau$. 
<b>
$$
\boxed{\widehat{\dot{y}(0^+)} = \frac{\text{rise}}{\text{run}}= \frac{K - y(0^+)}{\tau}}
$$
</b>

## Second Order Systems

Textbook second-order system is written
<b>
$$
\begin{equation}
G_2(s) = \frac{K\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}
\end{equation}
$$
</b>

with three parameters: DC gain $K$, undamped natural frequency $\omega_n > 0$, and damping ratio $\zeta \geq 0$. The poles are

<b>
$$
p_{1,2} = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2 - 1}
$$
</b>

Qualitative behaviour is governed by $\zeta$:
<ul>
<li><b>$0 \geq \zeta < 1$</b> — <em>underdamped</em>; complex-conjugate poles, oscillatory step response</li>
<li><b>$\zeta = 1$</b> — <em>critically damped</em>; repeated real pole, fastest non-oscillatory response</li>
<li><b>$\zeta > 1$</b> — <em>overdamped</em>; two distinct real poles, slow exponential rise</li>
</ul>

<img class="center" src="/assets/img/sys_id/second_order.svg" alt="second_order_step">

### Performance Specs

The standard specs all fall out of the underdamped formula. Setting $\dot{y}(t) = 0$ gives the peak times $t_k = k\pi/\omega_d$, with the first peak at

<b>
$$
\boxed{t_{p} = \frac{\pi}{\omega_d} = \frac{\pi}{\omega_n \sqrt{1-\zeta^2}} }
$$
</b>

The peak overshoot is

<b>
$$
\boxed{M_{p} = \frac{y(t_{p})-K}{K} = \exp(-\frac{\zeta\pi}{\sqrt{1-\zeta^2}}) }
$$
</b>

The 2% settling time is well-approximated (within the envelope of the decaying exponential) by

<b>
$$
\boxed{t_s \approx \frac{4}{\zeta\omega_n} \qquad t_s^{(5\%)} \approx \frac{3}{\zeta\omega_n}}
$$
</b>

### Identifying $K$, $\zeta$, $\omega_n$ from Measured Response
<ol>
<li><b>DC gain:</b> $K = y(\infty)-y(0)$, exactly as in the first-order case. </li>
<li><b>Underdamped $\zeta$:</b> look at first peak, compute $M_p = (y_{peak}-K)/K$d, and apply
$$
\zeta = \frac{-\ln{M_p}}{\sqrt{\pi^2 + \ln^2M_p}}
$$
</li>
<li><b>Natural frequency:</b> find the first peak $t_p$ and use
$$
\omega_n = \frac{\pi}{t_p \sqrt{1-\zeta^2}}
$$
</li>
</ol>

For an overdamped response the picture is messier because two real time constants dominate. The pragmatic move is to attack in the frequency domain, where the same methods also 
translate well to higher-order systems.

# Identification of Higher Order Systems
The frequency domain is a friendlier place to do system identification once the system order goes up. The following sections cover two complementary techniques.

<ol>
<li>Non-parametric, Bode identification — stable, minimum phase systems</li>
<li>Parametric identification — least-squares method</li>
</ol>

## Non-parametric System Identification
The goal of this technique is to estimate system $H(s)$ over a chosen frequency band, with no assumption to specific model order. The simplest way is to provide a sinusoidal input and measure the magnitude and phase of the response. Suppose that we apply a sinusoidal input of the form
$$
\begin{equation}
u(t) = \alpha \cos(\omega t), \quad \forall t \in [0,T].
\end{equation}
$$
Assume $H(s)$ is BIBO stable, the measured output takes the form
$$
\begin{equation}\label{sinusoid_y}
y(t) = \alpha A_\omega \cos(\omega t + \phi_\omega) + \varepsilon(t) + n(t), \quad A_\omega \equiv \lvert H(j\omega) \rvert, \\\; \phi_\omega \equiv \angle H(j\omega)
\end{equation}
$$
where $n(t)$ is measurement noise and $\varepsilon(t)$ is a transient signal that converges to zero, bounded by function $ce^{\lambda t}$; $c$ is some constant and $\lambda$ is the real part of the slowest plant pole. In principle you can read amplitude and phase straight off the steady-state output: fit a sinusoid to the late-time data and you have one Bode point. Repeat at $\omega_1, \omega_2,...,\omega_M$ and you have a Bode plot.

### Practical Considerations
In practice, especially where noise is present, it may be difficult to determine the amplitude and phase of $y(t)$ by inspection. The correlation method aims to solve this problem, improving the accuracy of the frequency response identification. Suppose we measure $K$ samples of the system response at times $t_s=kT_s$, $k=[0,1,2,..,K-1]$, in the correlation method we compute the complex average:

$$
\begin{equation}
X_\omega \equiv \frac{1}{K} \sum_{k=0}^{K-1} e^{-j\omega T_s k}y(T_sk) = \frac{1}{K} \sum_{k=0}^{K-1} \left( \cos(\omega T_sk) - j\sin(\omega T_sk) \right)y(T_sk).
\end{equation}
$$

Substituting with the Equation \ref{sinusoid_y}, 

$$
X_\omega = \frac{\alpha}{2}H(j\omega) + \frac{\alpha}{2K}H^*(j\omega)\frac{1-e^{-2j\omega T_sK}}{1-e^{-2j\omega T_s}} + \frac{1}{K}\sum_{k=0}^{K-1} e^{-j\omega T_s k}(\varepsilon(T_sk) + n(T_sk)).
$$

As $K$ approaches $\infty$, the second and third term converge to zero — second by orthogonality of distinct frequencies, the third by the law of large numbers as long as the noise has no pure component at $\omega$. We are left with a clean estimator:

<b>
$$
\boxed{\widehat{H(j\omega)} = \frac{2}{\alpha}X_\omega}
$$
</b>

Some key considerations of this technique:

<em>Strengths:</em>
<ul>
<li><b>Robust to noise:</b> typically robust to noise because it uses a large amount of data to estimate a single point in the Bode plot</li>
<li><b>Few model assumptions:</b> no assumption on rationality or order; procedure works on plants with delays, mild non-linearities, and even distributed-parameter dynamics</li>
</ul>

<em>Weaknesses:</em>
<ul>
<li><b>Long experiments:</b> at every frequency, we require a long input to have confidence of the measurment. This results in a long experimentation time to obtain the Bode plot</li>
<li><b>Require specific (sinusoidal) inputs:</b> sinusoids may be unsafe on certain plants, especially open-loop unstable ones, and often impossible on production systems</li>
<li><b>No parametric model:</b> We do not get a parametric form of the transfer function, instead we get the Bode plot. For simple systems (stable, minimum phase) it may be possible to estimate the locations of poles and zeros directly from the Bode plot</li>
</ul>

## Parametric System Identification
In *parametric identification*, we try to estimate a finite number of unknown parameters that characterize the model of the system. Consider system transfer function
$$
\begin{equation}\label{rational_tf}
H(s) = \frac{a_ms^m + a_{m-1}s^{m-1}+ \cdots + a_1s + a_0}{s^n + b_{n-1}s^{n-1}+ \cdots + b_1s + b_0},
\end{equation}
$$
where $a_i$ and $b_i$ are the coefficients to $m$ zeros and $n$ poles. The classical tool for determinining the coefficients is least squares.

## Vector Least-Squares
Let $z(i) \in \mathbb{R}^m$ be a regressor and $y(i) \in \mathbb{R}$ a scalar measurment, related by
$$
y(i) = z(i) \cdot \theta + \text{noise}, \quad i=1,2,...,N,
$$
for some unknown parameter vector $\theta \in \mathbb{R}^m$. Stack the $N$ equations:

$$
Y = Z\theta + e, \quad 
Z=\begin{bmatrix}z(1)\\\\z(2)\\\\ \vdots \\\\ z(N)\end{bmatrix}_{N \times m}, \quad
Y=\begin{bmatrix}y(1)\\\\y(2)\\\\ \vdots \\\\ y(N)\end{bmatrix}_N
$$

The least-squares estimate can be written as
$$
MSE = \frac{1}{N} \lVert {E} \rVert ^2 = \frac{1}{N}E'E,
$$
where $E=Z\theta-Y$. Rewriting:
$$
MSE = \frac{1}{N}(\theta'Z'-Y')(Z\theta-Y) = \frac{1}{N}(\theta'Z'Z'\theta - 2Y'Z\theta + Y'Y)
$$
Minimizing the MSE
$$
\nabla_\theta MSE = \frac{1}{N}(2\theta'Z'Z - 2Y'Z) = 0 \quad \Leftrightarrow \quad \theta' = Y'Z(Z'Z)^{-1}
$$
The least-squares estimate is thus
<b>
$$
\begin{equation}\label{least_squares_theta}
\boxed{\hat{\theta} = (Z'Z)^{-1}Z'Y}
\end{equation}
$$
</b>

Two sanity checks should be done with this estimate. The normalized mean-square error 
$$
\frac{MSE}{MSO} = \frac{ \lVert Z\hat{\theta}-Y\rVert^2}{\lVert Y \rVert^2},
$$
which checks the quality of fit. And the estimation-error covariance
$$
\text{Cov}(\hat{\theta}) \approx \frac{1}{N-m}\lVert Z\hat{\theta} - Y \rVert^2 (Z'Z)^{-1}
$$
which flags identifiability problems: if any diagonal entry's square root (STD of an estimated parameter) is on the order of the parameter itself, the model is not identificable from this data.

## Frequency-Domain Least-Squares
$$
\begin{equation}
\frac{Y(s)}{U(s)} = H(s) = \frac{a(s)}{b(s)} = \frac{a_ms^m + a_{m-1}s^{m-1}+ \cdots + a_1s + a_0}{s^n + b_{n-1}s^{n-1}+ \cdots + b_1s + b_0},
\end{equation}
$$
or equivalently $b(s)Y(s) = a(s)U(s)$. We can stack the numerator and denominator coefficients such that
$$
\theta = [a_m,\dots,a_0,b_{n-1},\dots,b_0]'
$$
$$
s^nY(s) = \Phi(s) \cdot \theta, \quad \Phi(s) = \begin{bmatrix}s^mU(s),\dots,U(s),-s^{n-1}Y(s),\dots,-Y(s)\end{bmatrix}.
$$
Apply inverse Laplace transform, and we get the <em>continuous-time autoregressive with exogenous input (CARX)</em> model
$$
\frac{d^n y(t)}{dt^n} = \varphi(t)\cdot \theta, \quad \varphi(t) = \begin{bmatrix} \frac{d^m u}{dt^m},\dots,u,-\frac{d^{n-1}y}{dt^{n-1}},\dots,-y\end{bmatrix}
$$
to get it into the form we are familiar with (Equation \ref{least_squares_theta}), we simply vectorize:
$$
\Phi = \begin{bmatrix}\varphi(t_0) \\\\ \varphi(t_1) \\\\ \vdots \\\\ \varphi(t_N) \end{bmatrix}, \quad
Y = \begin{bmatrix}\frac{d^ny}{dt^n}\rvert_{t_0} \\\\ \frac{d^ny}{dt^n}\rvert_{t_1} \\\\ \vdots \\\\ \frac{d^ny}{dt^n}\rvert_{t_N}\end{bmatrix},
$$
<b>
$$
\boxed{\hat{\theta} = (\Phi'\Phi)^{-1}\Phi'Y}
$$
</b>

### Practical Considerations
Building $\Phi$ requires the first $n-1$ derivatives of the measured output $y$, and building $Y$ requires the 
$n$-th derivative. Each numerical differentiation amplifies high-frequency content by a factor of $\omega$, making the naive CARX solution unusable on real data.

The solution is to filter the data. Consider the polynomial
$$
\omega(s) = s^\ell + \omega_{\ell-1}s^{\ell-1} + \cdots + \omega_0, \quad \ell \geq n,
$$
with all roots strictly in the LHP. The transfer function $\frac{1}{\omega(s)}$ is therefore asymptotically stable. We filter both signals through $1/\omega(s)$:
$$
y_f(t) = \mathcal{L}^{-1} \left\\\{ \frac{1}{\omega(s)} Y(s) \right\\\}, \quad
u_f(t) = \mathcal{L}^{-1} \left\\\{ \frac{1}{\omega(s)} U(s) \right\\\}.
$$
Multiplying the original equation $b(s)Y(s) = a(s)U(s)$ on both sides by $1/\omega(s)$ gives $b(s)Y_f(s) = a(s)U_f(s)$. And rewriting the rest with the filtered data:
$$
\frac{d^n y_f(t)}{dt^n} = \varphi_f(t)\cdot \theta, \quad \varphi_f(t) = \begin{bmatrix} \frac{d^m u_f}{dt^m},\dots,u_f,-\frac{d^{n-1}y_f}{dt^{n-1}},\dots,-y_f\end{bmatrix}
$$
the parameter $\theta$ stays the same. The point of doing this is that each derivative of $y_f$ is a filter on the raw output $y$:
$$
\mathcal{L}\left\\\{ \frac{d^k y_f}{dt^k}\right\\\} = \frac{s^k}{\omega(s)}Y(s).
$$
For $\ell \geq k$, this filter has at least as many poles as zeros — it does not amplify high frequencies, and the net behavior stays bounded.

### MATLAB
In application, `tfest()` in MATLAB is the function to utilize. It runs a more sophisticated estimator than the bare least-squares described in the preceeding sections; it auto-tunes $\omega(s)$, iterates on the prediction error, and reports $\text{Cov}(\hat{\theta})$ and quality-of-fit through `model.report`.

One other tool we can use to complement `tfest` is plotting the estimated system on a Root-Locus plot. It is often that physical systems have many more poles/zeros than what we care to model or design controllers to. A root-locus analysis helps us understand dominant poles and whether a system can be reasonably reduced to a lower order one.
