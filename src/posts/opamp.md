---
title: Operational Amplifier Design & Calculations
tags: ["analog","ic"]
date: '2024-02-01'
---

<img class="center" src="/assets/img/opamp/opamp_note1.jpeg" alt="opamp notes">

# Introduction 
This post covers the design and calculations for a simple 2-stage operational amplifier. 

The design uses a simple OTA as the first stage and a common-source amplifier for the output stage. Cascode transistors are used to improve accuracy and overall gain of the amplifier. Compensation is implemented to increase the system phase margin and improve stability at high frequency. 

*Limitations: these are my personal notes for the bulk of initial designs and is not meant as an outline of a complete design process.*

# Design Specification
<ul>
<li>P-MOS input, N-MOS output</li>
<li>DC gain > 90dB</li>
<li>UGW = 5MHz</li>
<li>PM: ~60º</li>
</ul>

# Calculations

## DC Gain $A_{V,tot}$
<img class="center md:w-[clamp(10rem,80%,30rem)]" src="/assets/img/opamp/opamp_stages.svg" alt="opamp stages">
Determining the expression for total DC gain is straight-forward. When the amplifier is simplified into the above functional stages, we see that

<b>
$$
A_{V,tot} = A_{V1}A_{V2}
$$
</b>

Since the two stages are both effectively common-source amplifiers, their gains are simply $A_V = g_m r_o$. Referencing the designators in the schematic, we can write the expressions as

$$
\begin{align}
A_{V1} &= g_{m1}(r_{o1} || r_{o4}) \tag{$\ast$}\label{Av1} \\\\
A_{V2} &= g_{m2}(r_{o2} || r_{o5}), \quad r_{o5} = r_{ds5}(1+g_{m5}r_{o6}) \tag{}
\end{align}
$$

During initial design, the $g_m$ values can be coarsely approximated using the expression

$$
g_m = \frac{2I_D}{V_{gs}-V_{th}}
$$

In practice, we should determine the values by first characterizing and plotting *$g_m/I_D$* curves of the transistors. To pick the values for $A_{V1}$ and $A_{V2}$, we need to take into account of the total system response. 

## Placing $p_1$ and $p_2$
Recall that the design requirements specify a unity gain frequency (UGW) of 5MHz. We can assume that the system has *two dominant poles $p_1$ and $p_2$ at $\omega_{p1}$ and $\omega_{p2}$*, respectively. We further assert that $p_2$ is at a frequency higher than UGW and that it does not participate significantly in the initial roll-off — the justification for this assertion is that we require it to be the case, since having two poles before cross-over leads to instability of the overall system.

Using these conditions, we determine the location of $p_1$ by drawing a line at a slope of $-20\text{ dB}/\text{decade}$ from $(5\text{ MHz},0\text{ dB})$ to where it intersects a horizontal line at 90dB (the DC gain of the system). 

<div>
<div class="img_container center md:w-[clamp(20rem,50%,50rem)] aspect-[1/1] rounded-xl">
<img class="object-cover scale-220 origin-[70%_0%]" src="/assets/img/opamp/opamp_note1.jpeg" alt="H(s) magnitude">
</div>
<p class="fig_caption text-pretty">Idealized Bode plots of system transfer function $H(s)$</p>
</div>
</br>

Mathematically, this is can be computed as

$$
\begin{align*}
p_1 &: (5\text{ MHz})(10^{-\operatorname{log|A_{V,tot}|}}),\quad A_{V,tot}:\text{ [V/V]} \\\\
    &= (5\text{ MHz})(10^{- A_{tot,dB} / 20}),\quad A_{tot,dB} = 90\text{ [dB]} \\\\
    &=  (5\text{ MHz})(10^{-4.5}) \\\\
    &= \boxed{158\text{ Hz}}
\end{align*}
$$

As for the location of $p_2$, it is convenient to approximate its location with an idealized Bode phase plot — where a -90º phase change begins 1 decade before a pole and finishes 1 decade after. Suppose $p_2$ is placed half a decade after cross-over, it will contribute -22.5º of phase shift to the system response by cross-over. In other words, the total phase shift at cross-over will be -112.5º, giving the system a phase margin of 67.5º — close to the target phase margin of 60º. 

$$
\text{Choose }p_2: (5\text{ MHz})(10^{-4.5}) = \boxed{1.58\times 10^{7} \text{ Hz}}
$$
In practice, this placement is difficult to achieve without compensation, so we typically employ Miller compensation technique to simulatneously shift (split) the pole locations and introduce additional phase margin by injecting a zero in between.

## Compensation
System stability is improved when we leverage Miller effect and introduce a zero between the poles. When compensator capacitor $C_C$ is placed between the input and output nodes of the second stage amplifier, its *effective input capacitance* is

$$
C_{eff} = (1+A_{V2})C_C \approx A_{V2}C_C
$$

The approximation assumes a large stage 2 gain $A_{V2}$, as is typical (and practical) for such topology. As such we also assume the node between stage 1 and stage 2, *node W*, to be the responsible for dominant pole $p_1$. We then make the approximation that

$$
\omega_{p1} \approx \frac{1}{R_W C_{eff}}, \quad \text{where } R_{W} = (r_{o1}||r_{o4}) = \frac{A_{V1}}{g_{m1}}
$$

$R_W$ is simply a rewriting of the $A_{V1}$ equation \eqref{Av1}. Putting the expressions together yields

$$
R_W C_{eff} \approx \frac{A_{V1}}{g_{m1}} \cdot A_{V2}C_C = \frac{A_{V,tot}C_C}{g_{m1}}
$$

and

<b>
$$
\omega_{p1} \approx \frac{g_{m1}}{A_{V,tot}C_C}
$$
</b>

Finally, we derive the placement of the zero by making the observation that at $s_z$

$$
\left| \frac{V_{out}(s_z)}{V_W} \right| = 0
$$

Assuming load resistance is large (necessary to achieve high gain for $A_{V2}$), nodal analysis yields

$$
\begin{align*}
\frac{V_W}{R_z + Z_c} &= g_m V_W \\\\
\frac{sC_C}{sR_z C_C + 1} &= g_m \\\\
\\\\
sC_C &= g_m [sR_z C_C + 1] \\\\
\\\\
sC_C[1-g_m R_z] &= g_m
\end{align*}
$$

We thus choose the initial value of $R_z$ using the following equation, with the condition that $\omega_{z} < \omega_{p2}$ 
<b>
$$
\omega_z = \frac{g_{m2}}{C_C [1-g_{m2} R_z]} 
$$
</b>

# Remaining Steps
The above calculations can typically bring the design to about 80%~90% completion. The remaining steps of the design are to simulate the circuit under various *process, voltage, and temperature* conditions (typically at their extremes) and to run Monte Carlo simulations to assess noise. These final steps are instrumental in finalizing the dimensions of the devices as well as assuring performance at all PVT extremes.   