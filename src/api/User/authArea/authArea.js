import { prisma } from '../../../../generated/prisma-client';
import { address2Coords, getDistanceFromCoords } from '../../../utils';

export default {
  Mutation: {
    authArea: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        user: { id },
      } = request;
      const { lat, lng, area } = args;
      console.log('authArea', id, lat, lng, area);

      try {
        const coords = await address2Coords(area);
        const km = getDistanceFromCoords(lat, lng, coords.y, coords.x);
        console.log(km);
        // 설정한 지역과 사용자 위치가 5km 이내일 때
        if (km < 5) {
          await prisma.updateUser({
            where: { id },
            data: { areaAuth: true },
          });
          return true;
        } else {
          await prisma.updateUser({
            where: { id },
            data: { areaAuth: false },
          });
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
