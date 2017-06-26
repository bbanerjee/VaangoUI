function testRotation
axis_a = [2.250054 1.570796 0.6792575];  % angles wrt x, y, z
axis_b = [1.570796 4.61936e-07 1.570796];  % angles
axis_c = [2.462335 1.570796 2.250054];  % angles

axis_a = cos(axis_a);
axis_b = cos(axis_b);
axis_c = cos(axis_c);

axis_a_norm = axis_a/norm(axis_a)
axis_b_norm = axis_b/norm(axis_b)
axis_c_norm = axis_c/norm(axis_c)

dot(axis_a_norm, axis_b_norm)
dot(axis_a_norm, axis_c_norm)
dot(axis_b_norm, axis_c_norm)

rotMat = getRotationMat(axis_a, axis_b, axis_c)
[phi, theta, psi] = convertToEulerAngles(rotMat)

[axis, angle] = computeAxisAngleFromRotTensor(rotMat)
rotMat_aa = getRotationMatAxisAngle(axis, angle)
rotMat

x_lab = [1 0 0];
y_lab = [0 1 0];
z_lab = [0 0 1];

comp_axis_a = rotMat*x_lab'
axis_a
comp_axis_b = rotMat*y_lab'
axis_b
comp_axis_c = rotMat*z_lab'
axis_c

end

function [rotMat] = getRotationMat(axis_a, axis_b, axis_c)

  rotMat = zeros(3,3);

  x_lab = [1 0 0];
  y_lab = [0 1 0];
  z_lab = [0 0 1];

  rotMat(1,1) = dot(x_lab, axis_a);
  rotMat(1,2) = dot(x_lab, axis_b);
  rotMat(1,3) = dot(x_lab, axis_c);
  rotMat(2,1) = dot(y_lab, axis_a);
  rotMat(2,2) = dot(y_lab, axis_b);
  rotMat(2,3) = dot(y_lab, axis_c);
  rotMat(3,1) = dot(z_lab, axis_a);
  rotMat(3,2) = dot(z_lab, axis_b);
  rotMat(3,3) = dot(z_lab, axis_c);

  orthoerr = rotMat*rotMat' - eye(3)
  norm(orthoerr)
  ortho = sum(sum(orthoerr, 1)); 
  if (ortho > 0.1e-8) 
    ortho
    err = '**WARNING** The rotation matrix is not proper orthogonal'
    return
  end

end

function [rotMat] = getRotationMatAxisAngle(axis, angle)

  cosangle = cos(angle);
  sinangle = sin(angle);

  axisdyad = axis'*axis
  Id = eye(3);
  A = [[0 -axis(3) axis(2)];[axis(3) 0 -axis(1)];[-axis(2) axis(1) 0]];
  
  Id_aa = Id - axisdyad; 

  rotMat = Id_aa*cosangle + axisdyad + A*sinangle;

  orthoerr = rotMat*rotMat' - eye(3)
  norm(orthoerr)
  ortho = sum(sum(orthoerr, 1)); 
  if (ortho > 0.1e-8) 
    ortho
    err = '**WARNING** The axis-angle rotation matrix is not proper orthogonal'
    return
  end
end

% phi = rotation about z-axis
% theta = rotation around new x-axis
% psi = rotation about new z_axis
function [phi, theta, psi] = convertToEulerAngles(rotMat)
  theta = 0.0;
  phi = 0.0;
  psi = 0.0;
  costheta = rotMat(3,3);
  sinthetasq = 1.0 - costheta*costheta;
  if (sinthetasq < 0.1e-20) 
    theta = acos(costheta);
    psi = 0.0;
    phi = atan2(rotMat(2,1), rotMat(1,1));
    return;
  end
  theta = acos(costheta);
  phi = atan2(rotMat(1,3), -rotMat(2,3));
  psi = atan2(rotMat(3,1), rotMat(3,2));
end

function [axis, angle] = computeAxisAngleFromRotTensor(rotMat)
  axis = [0 0 0];
  cosangle = 0.5*(rotMat(1,1) + rotMat(2,2) + rotMat(3,3) -1);
  sinangle = sqrt(1.0 - cosangle*cosangle);
  angle = acos(cosangle);
  if (abs(sinangle) > 0.1e-10) 
    ['general case']
    axis(1) = (rotMat(3,2) - rotMat(2,3))*0.5/sinangle;
    axis(2) = (rotMat(1,3) - rotMat(3,1))*0.5/sinangle;
    axis(3) = (rotMat(2,1) - rotMat(1,2))*0.5/sinangle;
  elseif (cosangle > 0.0) 
    ['id case']
    axis(1) = 1.0;
    axis(2) = 0.0;
    axis(3) = 0.0;
  else
    ['180 case']
    Id = eye(3);
    scratch = rotMat;
    costheta = 0.0;
    scratch = scratch + Id;
    j = -12345;
    for k=1:3
      sintheta = scratch(1,k)*scratch(1,k) +  ...
                 scratch(2,k)*scratch(2,k) +  ...
                 scratch(3,k)*scratch(3,k);
      if (sintheta > costheta) 
        costheta = sqrt(sintheta);
        j = k;
        scratch(1, j) = scratch(1, j)/cosTheta; 
        scratch(2, j) = scratch(2, j)/cosTheta; 
        scratch(3, j) = scratch(3, j)/cosTheta; 
      end
    end
    axis(1) = scratch(1,j);
    axis(2) = scratch(2,j);
    axis(3) = scratch(3,j);
  end
end

function [R] = rotMatFromEulerAngles(phi, theta, psi)
end

function rotation_matrix_demo

disp("Picking random Euler angles (radians)");

x = 2*pi*rand() - pi % -180 to 180
y = pi*rand() - pi*0.5 % -90 to 90
z = 2*pi*rand() - pi % -180 to 180

disp("\nRotation matrix is:");
R = compose_rotation(x,y,z)

disp("Decomposing R");
[x2,y2,z2] = decompose_rotation(R)

disp("");
err = sqrt((x2-x)*(x2-x) + (y2-y)*(y2-y) + (z2-z)*(z2-z))

if err < 1e-5
disp("Results are correct!");
else
disp("Oops wrong results :(");
end
end

function [x,y,z] = decompose_rotation(R)
x = atan2(R(3,2), R(3,3));
y = atan2(-R(3,1), sqrt(R(3,2)*R(3,2) + R(3,3)*R(3,3)));
z = atan2(R(2,1), R(1,1));
end

function R = compose_rotation(x, y, z)
X = eye(3,3);
Y = eye(3,3);
Z = eye(3,3);

    X(2,2) = cos(x);
    X(2,3) = -sin(x);
    X(3,2) = sin(x);
    X(3,3) = cos(x);

    Y(1,1) = cos(y);
    Y(1,3) = sin(y);
    Y(3,1) = -sin(y);
    Y(3,3) = cos(y);

    Z(1,1) = cos(z);
    Z(1,2) = -sin(z);
    Z(2,1) = sin(z);
    Z(2,2) = cos(z);

R = Z*Y*X;
end

