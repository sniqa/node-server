import ip, { SubnetInfo } from 'ip'

export const subnet = (ipAddress: string, subnet: string | number) => {
	if (typeof subnet === 'number') {
		return ip.cidrSubnet(`${ipAddress.trim()}/${subnet}`)
	} else {
		return ip.subnet(ipAddress.trim(), subnet.trim())
	}
}

export const createIpRange = <T>(
	cidr: SubnetInfo,
	callback: (ipAddress: string) => T
) => {
	const firstIpLong = ip.toLong(cidr.firstAddress)

	return Array.from({ length: cidr.numHosts }, (_, index) => {
		const ipAddress = ip.fromLong(firstIpLong + index)

		return callback(ipAddress)
	})
}
