---
title: Bipedal Compass-Gait Walker
tags: ["control theory","matlab"]
date: '2020-06-13'
---

<img class="center" src="/assets/img/cg_walker/x1_orbit_fine.png" alt="cg_walker_orbit">

# Introduction
Compass-gait bipedal walkers have been studied extensively as a fundamental model in robotics and locomotion. Their kinematics are motivated by the pendular efficiencies of human walking.

For this project, I modeled a compass-gait walker as a passive system. Its movement, thus, relies solely on gravity and the resulting pendular motion of its legs. 

The focus of this project is to model the *equations of motion*, derived using a combination of Newton-Euler and Lagrangian mechanics (TMT-method, presented by Vallery and Schwab<a href="#ref1"><sup>[1]</sup></a>). Additionally, after the walker is modeled, its interaction with the incline surface can be observed. From these simulations, we are able to observe *limit cycles, bifurcation, and eventually, chaos!*

## Software \& Simulation Tools
The system is modeled and simulated entirely within MATLAB computing environment.

# System Definitions
The biped robot features two legs connected at the hip. Each leg is rectangular with a rounded foot. It is allowed to walk down a sloped surface defined by road grade **\\(\gamma\\)**, relying solely on gravity and no external control inputs.

As the legs swing, one leg is denoted "stance leg" and the other as "swing leg". Corresponding states of the system are denoted by subscripts **\\(st\\)** and **\\(sw\\)**, respectively.

Additionally, Each leg of the robot has a center of mass (CoM) located by an offsets **\\(B\\)** and **\\(C\\)**. The rounded feet are defined by radius **\\(R\\)**, allowing the walker to roll their feet along the ground upon impact.

Finally, the states of the system are defined by the vector:

<b>
\begin{bmatrix}
\phi_{st} & \phi_{sw} & \dot{\phi} _{st} & \dot{\phi} _{sw}
\end{bmatrix}
</b>

Below is a sketch of the system.

<img class="center" src="/assets/img/cg_walker/cg_walker_sketch.jpeg" alt="cg_walker_sketch">

## Impact Modeling
Contact and collision in the system is characterized by non-slip and no-bounce contact. Under such definition, translational momentum at the point of contact is *not conserved*. This simplification is reasonable for most low road grade simulations, where impact is relatively low. In this project, the system is necessarily operated at low road grades, because beyond a certain angle **\\(\gamma\\)**, it is not possible to keep the walker from falling over. Furthermore, it allows us to reduce the number of states to simulate, as the position and translational velocities of the legs become coupled with the angle and angular velocities of the legs. As such, the system is completely described by the states \\(\begin{bmatrix}
\phi_{st} & \phi_{sw} & \dot{\phi} _{st} & \dot{\phi} _{sw}
\end{bmatrix}\\)


# Limit Cycles, Bifurcation, and Chaos

In order to observe bifurcation of the system, the walker should be maintained such that it does not fall over. If the robot were to fall over, its corresponding states likely do not belong to a limit-cycle we are interested in. 

To aid in observing its limit cycles, the walker begins its simulated walk at an inital state close to one of its attractors. Doing so helps to 
<ol>
<li>ensure that the walker does not fall over during simulation, and</li>
<li>reduce the number of simulated steps required before periodic motion begins to emerge.</li>
</ol>

It typically takes some number of steps before the system begins to settle towards its attractors; and that to observe bifurcation, many more additional steps are required to observe their periodic orbits.
According to Strogatz, observing bifurcation requires on the order of a few hundred cycles (~300) per parameter value<a href="#ref2"><sup>[2]</sup></a>. Consequently, producing a bifurcation diagram over a range of values for a system variable (in this case, \\(\gamma\\)) quickly becomes computationally intensive, as each cluster of points on the diagram requires hundreds of simulation steps. 

For the following orbit diagrams, I simulated the system across approximately 10,000 increments of \\(\gamma\\). At each value of \\(\gamma\\), the walker completed 600 steps, and the system states at the moment of impact were recorded and plotted against the corresponding road grade. The resulting diagrams clearly demonstrate that the system states exhibit bifurcation and chaotic behavior.

<article style="overflow:hidden;">
    <div class="grid-container center md:max-lg:grid-cols-1">
        <div>
          <img class="w-full object-cover object-top" src="/assets/img/cg_walker/x1.png" alt="x1">
          <p class="fig_caption">(a)</p>
        </div>
        <div>
          <img class="w-full object-cover object-top" src="/assets/img/cg_walker/x2.png" alt="x2">
          <p class="fig_caption">(b)</p>
        </div>
        <div>
          <img class="w-full object-cover object-top" src="/assets/img/cg_walker/x3.png" alt="x3">
          <p class="fig_caption">(c)</p>
        </div>
        <div>
          <img class="w-full object-cover object-top" src="/assets/img/cg_walker/x4.png" alt="x4">
          <p class="fig_caption">(d)</p>
        </div>
    </div>
    <p class="fig_caption">Bifurcation of system states: (a) $\phi_{st}$, (b) $\phi_{sw}$, (c) $\dot{\phi}_{st}$, (d) $\dot{\phi}_{sw}$</p>
</article>

## Simulation
An animation of the walker, created by plotting the system states over time in MATLAB, provides a visual confirmation of the model's behavior. This sanity check helps verify that the equations of motion and impact model were implemented correctly.

<video autoplay loop muted>
  <source src="/assets/img/cg_walker/CG_walk_animation.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

# References

<ol class="references">
<li id="ref1">H. Vallery and A. L. Schwab, <em>Advanced Dynamics</em>, 3rd ed. Delft University of Technology, 2020, ISBN/EAN 978-90-8309-060-3.</li>
<li id="ref2">S. H. Strogatz, <em>Nonlinear Dynamics and Chaos: With Applications in Physics, Biology, Chemistry, and Engineering</em>, Addison-Wesley Pub., 2000, ISBN 9780201543445.</li>
</ol>
